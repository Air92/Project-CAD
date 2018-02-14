import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import {HTTP} from '@ionic-native/http';
import {Geolocation} from '@ionic-native/geolocation';

/**
 * Generated class for the JourneyInitiationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;


@IonicPage()
@Component({
  selector: 'page-journey-initiation',
  templateUrl: 'journey-initiation.html',
})
export class JourneyInitiationPage {
   //store map object
   map: any;
   //store user location
   coord: any = {
     long: -2.242631,
     lat: 53.480759
   }
   //marker on map
   marker: any;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,private geolocation: Geolocation,) {
   
  }

  ngAfterViewInit() {
  
    
    this.onLocateUser();
      }
    
  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad JourneyInitiationPage');
    
  // }

  private onLocateUser(): void {
    this.geolocation.getCurrentPosition()
      .then((location) => {
        console.log('sucess');
        var location = location;

        this.coord.long = location.coords.longitude;
        this.coord.lat = location.coords.latitude;

        this.mapCreation();

        this.marker = new google.maps.Marker({
          map: this.map,
          visible: true,
          position: new google.maps.LatLng(this.coord.lat, this.coord.long),
          Icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 5
          },
          clickable: false,
          draggable: false
        })



      })
      .catch((error) => {
        console.log('Error getting location', error);
      });



  }
  

  private geoLoc(location : any, callback){
    
    var geoCode = new google.maps.Geocoder();
      

      geoCode.geocode({
        address: location
      }, function (result, status) {
        if (status === 'OK') {
          console.log(result);
          callback(result[0].place_id);

        }
        else{
          callback("error");
        }
      });


  }
  




private mapCreation(): void {

  this.map = new google.maps.Map(document.getElementById("journeyMap"), {
    center: {
      lat: this.coord.lat,
      lng: this.coord.long
    },
    zoom: 15,
    draggable: true,
    fullscreenControl: false
  });  
  }

}