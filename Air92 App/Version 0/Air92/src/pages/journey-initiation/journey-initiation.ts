import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import {HTTP} from '@ionic-native/http';
import { Geolocation } from '@ionic-native/geolocation';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { BLE } from '@ionic-native/ble'
import { Vibration } from '@ionic-native/vibration';



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
export class JourneyInitiationPage
{


  makers = [];
  //store map object
  map: any;
  //store user location
  coord: any = {
    long: -2.242631,
    lat: 53.480759
  }


  watch: any;

  StartButton: Element;
  startPause: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, private ble: BLE, private vibration: Vibration)
  {
    //console.dir(usb);

  }

  ngAfterViewInit()
  {

    this.BluetoothFind().then((result) =>
    {
      this.BluetoothConnect(result).then((result) =>
      {

      }).catch((error) =>
      {

      })

    }).catch((error) =>
    {

    });
    this.startPause = true;
    this.StartButton = document.getElementById('StartButton')
    this.watchLocate();
    this.locateUser().then((result) =>
    {
      this.mapGen(document.getElementById('journeyMap')).then(() =>
      {

        var startAddress = this.navParams.get("startAddress");
        var endAddress = this.navParams.get("endAddress");
        this.addRoute(startAddress, endAddress);
      })
    });
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad JourneyInitiationPage');

  // }


  private stringToBytes(string)
  {
    var array = new Uint8Array(string.length);
    for (var i = 0, l = string.length; i < l; i++)
    {
      array[i] = string.charCodeAt(i);
    }
    return array.buffer;
  }

  private BluetoothWrite(deviceID: string, serviceUUID: string, characUUID: string, data: ArrayBuffer)
  {
    this.ble.write(deviceID, serviceUUID, characUUID, data).then((reuslt) =>
    {
      console.log(reuslt);

    }).catch((error) =>
    {
      console.log(error)
    });

  }


  private BluetoothFind = () =>
  {
    return new Promise((resolve, reject) =>
    {

      var laptop = "b8:81:98:9b:8a:6a"
      console.log("Start Bluetooth Scan")
      this.ble.startScan([]).subscribe(
        device =>
        {
          console.log("Found device: " + JSON.stringify(device));
          if (device.id = "B8:27:EB:12:47:10")
          {
            this.ble.stopScan();
            resolve(device.id);
          }
        },
        err =>
        {
          reject("BLE scan failed" + JSON.stringify(err));
          console.log("Error occurred during BLE scan: " + JSON.stringify(err));
        },
        () =>
        {
          console.log("End Devices");
        }
      );

    })
  }

  private BluetoothConnect = (id) =>
  {
    return new Promise((resolve, reject) =>
    {
      this.ble.connect(id).subscribe(
        device =>
        {
          console.log(device)
          resolve(device)
        },
        err =>
        {
          console.log("Connection failed" + JSON.stringify(err));
          reject("Connection failed" + JSON.stringify(err));

        }
      );

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
      icon: {
        url: "https://png.icons8.com/ios/2x/cloud-filled.png",
        scaledSize: new google.maps.Size(30, 30)
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

  relocate(lat: any, long: any)
  {
    //console.log("set center: " + lat + "  " + long);
    this.map.setCenter({
      lat: lat,
      lng: long
    }, );
    if (this.startPause)
    {
      this.vibration.vibrate(800);
      this.markerCreator(lat, long);
    }

  }



  watchLocate = () =>
  {
    //console.log("watching locatation");

    return new Promise((resolve, reject) =>
    {
      this.watch = this.geolocation.watchPosition();
      this.watch.subscribe((data) =>
      {
        //console.log(data.coords.latitude);
        //console.log(data.coords.longitude);

        var distance = this.distance(this.coord.lat, this.coord.long, data.coords.latitude, data.coords.longitude, "K");
        //console.log(distance);
        if (distance > 0.1)
        {
          this.coord.lat = data.coords.latitude;
          this.coord.long = data.coords.longitude;
          this.relocate(data.coords.latitude, data.coords.longitude);
          //console.log("distance is greater than 50m");

          this.postData();
        }
      });
    })
  }

  startJourney()
  {
    if (this.startPause)
    {
      this.StartButton.innerHTML = "Start"
      this.startPause = false;
    } else
    {
      this.StartButton.innerHTML = "Pause";
      this.startPause = true;
    }

  }


  //============================================================= Locate ============================================================= 
  //locates users
  locateUser = () =>
  {
    //console.log('user located');
    return new Promise((resolve, reject) =>
    {
      var options = { maximumAge: 0, timeout: 1000000, enableHighAccuracy: true };
      this.geolocation.getCurrentPosition(options).then((location) =>
      {
        //console.log('success');
        this.coord.long = location.coords.longitude;
        this.coord.lat = location.coords.latitude;
        resolve(location);
      }).catch((error) =>
      {
        //console.log(error);
      })
    })
  }
  //==================================================================================================================================

  private addRoute(startAddress: any, endAddress: any)
  {
    var route = new google.maps.DirectionsService;
    var render = new google.maps.DirectionsRenderer({
      draggable: false,
      map: this.map
    });


    var start = new google.maps.LatLng(startAddress.lat, startAddress.long);
    var end = new google.maps.LatLng(endAddress.lat, endAddress.long);

    this.renderRoute(route, render, start, end);

  }
  //==================================================================================================================================

  //============================================================= Render ============================================================= 
  //Renders route on map
  private renderRoute(route: any, render: any, start: any, end: any): void
  {
    //console.log("hit");
    route.route(({
      destination: end,
      origin: start,
      travelMode: 'WALKING'
    }), function (response, status)
      {
        //console.log(status);
        if (status === 'OK')
        {
          render.setDirections(response);
        }
      });

    this.markerCreator(this.coord.lat, this.coord.long);

  }
  //==================================================================================================================================

  //============================================================= MapGen =============================================================
  //generates map on passed element
  mapGen = (map: Element) =>
  {
    return new Promise((resolve, reject) =>
    {
      this.map = new google.maps.Map(map, {
        center: {
          lat: this.coord.lat,
          lng: this.coord.long
        },
        zoom: 15,
        styles: [
          {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#000000"
              }
            ]
          },
          {
            "featureType": "landscape.man_made",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#cbcbc9"
              }
            ]
          },
          {
            "featureType": "landscape.natural.terrain",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#878783"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#333331"
              }
            ]
          },
          {
            "featureType": "poi.business",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "stylers": [
              {
                "color": "#6fce7c"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#53b4f5"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#ffffff"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#000000"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#e9f5fe"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#000040"
              }
            ]
          },
          {
            "featureType": "transit",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#0b75bb"
              }
            ]
          }
        ],
        draggable: true,
        fullscreenControl: false
      });
      resolve(map);
    });
  }
  //==================================================================================================================================

  //=============================================================Post Data============================================================
  //post data to RestLet database 
  postData = () =>
  {

    //192.168.0.1
    var url = 'localhost/index';
    return new Promise(function (resolve, reject)
    {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.setRequestHeader("Content-type", "application/json");

      xhr.onload = function ()
      {
        //console.log(xhr.response);
        resolve(xhr.response);
      };
    });
  }
  //==================================================================================================================================




}