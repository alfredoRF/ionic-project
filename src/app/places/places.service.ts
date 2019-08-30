import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Place } from './place.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class PlacesService {
  private placesA = new BehaviorSubject<Place[]>([]);

  get places() {
    return this.placesA.asObservable();
  }

  constructor(private authService: AuthService, private http: HttpClient) { }

  fetchPlaces() {
    return this.http
      .get<{ [key: string]: PlaceData }>('https://ionic-angular-course-56fb5.firebaseio.com/offered-places.json')
      .pipe(map(resData => {
        const places = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            places.push(
              new Place(
                key,
                resData[key].title,
                resData[key].description,
                resData[key].imageUrl,
                resData[key].price,
                new Date(resData[key].availableFrom),
                new Date(resData[key].availableTo),
                resData[key].userId
              )
            );
          }
        }
        return places;
      }),
        tap(places => {
          this.placesA.next(places);
        })
      );
  }

  getPlace(id: string) {
    return this.places.pipe(take(1), map(places => {
      return { ...places.find(p => p.id === id) };
    }));
  }

  addPlace(title: string, description: string, price: number, dateFrom: Date, dateTo: Date) {
    let generId: string;
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
    return this.http.post<{ name: string }>('https://ionic-angular-course-56fb5.firebaseio.com/offered-places.json',
      { ...newPlace, id: null }).pipe(
        switchMap(resData => {
          generId = resData.name;
          return this.places;
        }), take(1), tap(places => {
          newPlace.id = generId;
          this.placesA.next(places.concat(newPlace));
        })
      );
    /* return this.places.pipe(take(1), delay(1000), tap(places => {
      this.placesA.next(places.concat(newPlace));
    })); */
  }

  updatePlace(placeId: string, title: string, description: string) {
    let updatedPlaces: Place[];
    this.places.pipe(take(1), switchMap(places => {
      const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
      updatedPlaces = [...places];
      const oldPlace = updatedPlaces[updatedPlaceIndex];
      updatedPlaces[updatedPlaceIndex] = new Place(oldPlace.id, title, description, oldPlace.imageUrl, oldPlace.price,
        oldPlace.availableFrom, oldPlace.availableTo, oldPlace.userId);
      return this.http.put(`https://ionic-angular-course-56fb5.firebaseio.com/offered-places/${placeId}.json`,
        { ...updatedPlaces[updatedPlaceIndex], id: null }
      );
    }), tap(() => {
      this.placesA.next(updatedPlaces);
    }));
  }
}

interface PlaceData {
  availableFrom: string;
  availableTo: string;
  description: string;
  imageUrl: string;
  price: number;
  title: string;
  userId: string;
}
