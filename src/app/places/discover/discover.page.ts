import { Component, OnInit, OnDestroy } from '@angular/core';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';

import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit , OnDestroy {
  loadedPlaces: Place[];
  listedLoadedPlaces: Place[];
  relevantPlaces: Place[];
  isLoading = false;
  private placesSub: Subscription;
  private filter = 'all';


  constructor(private placesService: PlacesService, private authService: AuthService) { }

  ngOnInit() {
    this.placesSub = this.placesService.places.subscribe(places => {
      this.loadedPlaces = places;
      this.onFilterUpdate(this.filter);
      // this.listedLoadedPlaces = this.loadedPlaces.slice(1);
      // this.relevantPlaces = this.loadedPlaces;
      // this.loadedPlaces = this.placesService.places.;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.placesService.fetchPlaces().subscribe();
  }

  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }

  onFilterUpdate(filter: string) {
    const isShown = place => filter === 'all' || place.userId !== this.authService.userId;
    this.relevantPlaces = this.loadedPlaces.filter(isShown);
    this.filter = filter;
  }
}
