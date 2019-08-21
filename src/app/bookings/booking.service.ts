import { Injectable } from '@angular/core';

import { Booking } from './booking.model';

@Injectable ({ providedIn: 'root'})
export class BookingsService {
    private bookingsL: Booking [] = [
        {
            id: 'xyz',
            placeId: 'p1',
            placeTitle: 'Manhattan Mansion',
            guestNumber: 2,
            userId: 'abc'
        }
    ];
    constructor() {}

    get bookings() {
        return [...this.bookingsL];
    }
}