import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, delay, tap } from 'rxjs/operators';

import { Booking } from './booking.model';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class BookingsService {
  private bookingsL = new BehaviorSubject<Booking[]>([]);

  get bookings() {
    return this.bookingsL.asObservable();
  }

  constructor(private authService: AuthService) {}

  addBooking(
    placeId: string,
    placeTitle: string,
    placeImg: string,
    firstName: string,
    lastName: string,
    guestNumber: number,
    bookedFrom: Date,
    bookedTo: Date
  ) {
    const newBooking = new Booking(
      Math.random().toString(),
      placeId,
      this.authService.userId,
      placeTitle,
      placeImg,
      firstName,
      lastName,
      guestNumber,
      bookedFrom,
      bookedTo
    );
    return this.bookings.pipe(take(1), delay(1000), tap(bookings => {
        this.bookingsL.next(bookings.concat(newBooking));
    }));
  }

  cancelBooking(bookingId: string) {
    return this.bookings.pipe(take(1), delay(1000), tap(bookings => {
      this.bookingsL.next(bookings.filter(b => b.id !== bookingId));
  }));
  }
}
