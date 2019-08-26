import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, map } from 'rxjs/operators';

import { Place } from './place.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private placesA = new BehaviorSubject<Place[]>( [
    new Place(
      'p1',
      'Manhattan Mansion',
      'In the heart of New York City',
      'https://untappedcities-wpengine.netdna-ssl.com/wp-content/uploads/' +
      '2012/02/Cornelius-Vanderbilt-II-House-Fifth-Avenue-Central-Park-NYC.jpg',
      189.99,
      new Date('2019-01-01'),
      new Date('2020-12-31'),
      'abc'
    ),
    new Place(
      'p2',
      'L\'Amour Toujours',
      'A romantic place in paris!',
      'https://travel.home.sndimg.com/content/dam/images/travel/stock/2016/8/23/0/GettyImages-Jurgen-Roberg-EyeEm-' +
      '609242177-France-Basilique-Du-Sacre-Coeur.jpg.rend.hgtvcom.966.644.suffix/1491594361714.jpeg',
      149.99,
      new Date('2019-01-01'),
      new Date('2020-12-31'),
      'abc'
    ),
    new Place(
      'p3',
      'The Foggy Place',
      'Not your average city trip!',
      'http://s1.favim.com/orig/140329/abandoned-cabin-foggy-forest-Favim.com-1571590.jpg',
      99.99,
      new Date('2019-01-01'),
      new Date('2020-12-31'),
      'abc'
    )
  ]);

  get places() {
    return this.placesA.asObservable();
  }

  constructor(private authService: AuthService) { }

  getPlace(id: string) {
    return this.places.pipe(take(1), map(places => {
      return { ...places.find(p => p.id === id) };
    }));
  }

  addPlace(title: string, description: string, price: number, dateFrom: Date, dateTo: Date) {
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      'http://s1.favim.com/orig/140329/abandoned-cabin-foggy-forest-Favim.com-1571590.jpg',
      price,
      dateFrom,
      dateTo,
      this.authService.userId
    );
    this.places.pipe(take(1)).subscribe(places => {
      this.placesA.next(places.concat(newPlace));

    });
  }
}
