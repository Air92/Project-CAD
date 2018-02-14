import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import {HTTP} from '@ionic-native/http';
import { Geolocation } from '@ionic-native/geolocation';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';


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
  
  StartButton : Element;
  startPause : boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, private bluetoothSerial: BluetoothSerial)
  {

  }

  ngAfterViewInit()
  {
    this.startPause = true;
    this.StartButton = document.getElementById('StartButton')
    this.watchLocate();
    this.locateUser().then((result) =>
    {
      this.mapGen(document.getElementById('journeyMap')).then(() =>
      {
        this.markerCreator(this.coord.lat, this.coord.long);
      })
    });
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad JourneyInitiationPage');

  // }



  private Bluetoothtest()
  {
    this.bluetoothSerial.isEnabled().then((result) =>
    {
      console.log(result);
      this.bluetoothSerial.connect("00:15:83:0C:BF:RB");
      this.bluetoothSerial.list().then((result) =>
      {
        console.log(result);
        this.bluetoothSerial.write('hello world').then((result) =>
        {
          console.log(result);
        })

      })
    })
  }

  //============================================================= Marker =============================================================
  //create marker on map
  markerCreator(lat: any, long: any)
  {
    this.makers.push(new google.maps.Marker({
      map: this.map,
      visible: true,
      position: new google.maps.LatLng(lat, long),
      Icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 5
      },
      clickable: false,
      draggable: false
    }));
  }
  //==================================================================================================================================


  distance(lat1, lon1, lat2, lon2, unit)
  {
    var radlat1 = Math.PI * lat1 / 180
    var radlat2 = Math.PI * lat2 / 180
    var theta = lon1 - lon2
    var radtheta = Math.PI * theta / 180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    if (unit == "K") { dist = dist * 1.609344 }
    if (unit == "N") { dist = dist * 0.8684 }
    return dist
  }

  relocate(lat : any, long : any){
    this.map.setCenter(new google.maps.LatLng(lat,long));
    if(this.startPause){
      this.markerCreator(lat, long);
    }
  
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

  watchLocate = () =>
  {
    console.log("watching locatation");

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
  //==================================================================================================================================

}