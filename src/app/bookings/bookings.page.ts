import { Component, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';

import { BookingsService } from './booking.service';
import { Booking } from './booking.model';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {

  constructor( private bookingS: BookingsService) { }
  loadedBookings: Booking[];
  ngOnInit() {
    this.loadedBookings = this.bookingS.bookings;
  }

  onCancelBooking(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    // cancel booking
  }

}
