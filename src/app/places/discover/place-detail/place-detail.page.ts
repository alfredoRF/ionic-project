import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController, ActionSheetController } from '@ionic/angular';

import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  place: Place;

  constructor(private route: ActivatedRoute,
              private navCtrl: NavController,
              private pService: PlacesService,
              private modalController: ModalController,
              private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }
      this.place = this.pService.getPlace(paramMap.get('placeId'));
    });
  }

  onBookPlace() {
    // this.navCtrl.navigateBack('/places/tabs/discover');
    this.actionSheetCtrl.create({
      header: 'chose an Action',
      buttons: [
        {
          text: 'Select Date'
        },
        {
          text: 'Random Date'
        },
        {
          text: 'Cancel'
        }
      ]
    });
    this.modalController.create({
      component: CreateBookingComponent,
      componentProps: { selectedPlace: this.place}
    }).then(modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss();
    }).then(result => {
      console.log(result.data, result.role);
      if (result.role === 'confirm') {
        console.log ('Book!');
      }
    });
  }

}
