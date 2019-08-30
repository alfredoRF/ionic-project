import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { PlacesService } from '../places.service';
import { Place } from '../place.model';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {
  private placesSub: Subscription;
  offers: Place[];
  isLoading = false;

  constructor( private placesService: PlacesService) { }

  ngOnInit() {
    this.placesSub = this.placesService.places.subscribe( places => {
      this.offers = places;
    });
  }
  ionViewWillEnter() {
    this.isLoading = true;
    this.placesService.fetchPlaces().subscribe(() => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
  /* onEdit(offerId: string) {
    console.log('Editing item', offerId);
  } */

}
