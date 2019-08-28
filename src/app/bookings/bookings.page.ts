import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';

import { BookingsService } from './booking.service';
import { Booking } from './booking.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {

  constructor( private bookingS: BookingsService) { }
  loadedBookings: Booking[];
  private bookingSub: Subscription;

  ngOnInit() {
    this.bookingSub = this.bookingS.bookings.subscribe(bookings => {
      this.loadedBookings = bookings;
    });
  }

  ngOnDestroy() {
    if (this.bookingSub) {
      this.bookingSub.unsubscribe();
    }
  }

  onCancelBooking(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    // cancel booking
  }

}
