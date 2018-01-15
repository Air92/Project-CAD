import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the LocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {
location : any;

constructor(public navCtrl: NavController, private geolocation: Geolocation) {
  }

  onLocateUser(){
    this.geolocation.getCurrentPosition()
      .then((location) => {
        console.log('sucess');
        this.location = location;
      })
      .catch((error) => {
      console.log('Error getting location', error);
    });

  }



}
