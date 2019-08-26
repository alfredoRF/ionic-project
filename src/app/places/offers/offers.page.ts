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

  constructor( private placesService: PlacesService) { }

  ngOnInit() {
    this.placesSub = this.placesService.places.subscribe( places => {
      this.offers = places;
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
