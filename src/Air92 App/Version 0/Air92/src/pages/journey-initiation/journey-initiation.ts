import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import {HTTP} from '@ionic-native/http';
import { Geolocation } from '@ionic-native/geolocation';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { BLE } from '@ionic-native/ble'
import { Vibration } from '@ionic-native/vibration';
import { BackgroundMode } from '@ionic-native/background-mode';



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

  header : any;

  watch: any;

  StartButton: Element;
  startPause: boolean;

  FirstTime: boolean = true;

  LocationMarker: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, private ble: BLE, private vibration: Vibration, private backgroundMode: BackgroundMode)
  {
    //console.dir(usb);

  }

  ngAfterViewInit()
  {

    this.backgroundMode.setDefaults({
      title: "Air 92",
      text: "Data is being collected",
    });
    //this.backgroundMode.enable();
    this.FirstTime = true;
    this.BluetoothFind().then((result) =>
    {
      this.BluetoothConnect(result).then((result) =>
      {
         this.watchLocate();
        //this.SensorData();

      }).catch((error) =>
      {

      })

    }).catch((error) =>
    {

    });
    this.startPause = true;
    this.StartButton = document.getElementById('StartButton')
    this.header = document.getElementById("results");

  }


  private GetSensorData()
  {

    console.log("Trying to Read");
    this.BluetoothRead("B8:27:EB:12:47:10", "12ab", "34cd").then((result) =>
    {
      var data = result.toString();
      console.log(data);
      this.header.innerHTML = data;
      this.DecodeData(data);
    });

    console.log("Done Reading")
  }

  private DecodeData(data: string)
  {
    var SensData = data.split(',');

    this.postData(parseFloat(SensData[0]), parseFloat(SensData[1]), parseFloat(SensData[2]), parseFloat(SensData[3]));
  }

  //=============================================================Post Data============================================================
  //post data to RestLet database 
  postData = (temp: number, humid: number, pat: number, gas: number) =>
  {
    var param =
      {
        "longitude": this.coord.long,
        "latitude": this.coord.lat,
        "journey": this.navParams.get("id"),
        "time": "11.11",
        "temperature": temp,
        "humidity": humid,
        "particleDensity": pat,
        "gasDensity": gas
      };

    console.log(JSON.stringify(param));

    var url = 'https://air92.restlet.net/v1/sensorPointses/';
    return new Promise(function (resolve, reject)
    {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      xhr.setRequestHeader("Content-type", "application/json");

      xhr.onload = function ()
      {
        resolve(xhr.response);
      };
      xhr.send(JSON.stringify(param));
    });
  }
  //==================================================================================================================================


  private BluetoothRead = (deviceID: string, serviceUUID: string, characUUID: string) =>
  {
    return new Promise((resolve, reject) =>
    {

      console.log("read");
      this.ble.read(deviceID, serviceUUID, characUUID).then((result) =>
      {
        resolve(String.fromCharCode.apply(null, new Uint8Array(result)));
      }).catch((error) =>
      {
        reject(error);

      });
    })
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
          if (device.id == "B8:27:EB:12:47:10" || device.name == "Air92")
          {
            console.log("Found Air92" + device.id)
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
    console.log("trying to connect");
    return new Promise((resolve, reject) =>
    {
      this.ble.connect("B8:27:EB:12:47:10").subscribe(
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
      animation: google.maps.Animation.DROP,
      icon: {
        url: "https://png.icons8.com/ios/2x/cloud-filled.png",
        scaledSize: new google.maps.Size(30, 30)
      },
      clickable: false,
      draggable: false
    }));
  }
  //==================================================================================================================================


  locationMarker(lat: any, long: any)
  {
    this.LocationMarker = new google.maps.Marker({
      map: this.map,
      visible: true,
      position: new google.maps.LatLng(lat, long),
      Icon: {
        url: "https://image.ibb.co/g1aiXn/marker.png",
        scaledSize: new google.maps.Size(30, 30)
      },
      clickable: false,
      draggable: false
    })
  }

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

  watchLocate()
  {
    this.watch = this.geolocation.watchPosition();
    this.watch.subscribe((data) =>
    {

      if (this.FirstTime)
      {
        this.coord.lat = data.coords.latitude;
        this.coord.long = data.coords.longitude;
        this.mapGen(document.getElementById('journeyMap'));
        this.locationMarker(this.coord.lat, this.coord.long);
        var startAddress = this.navParams.get("startAddress");
        var endAddress = this.navParams.get("endAddress");
        this.addRoute(startAddress, endAddress);
        this.FirstTime = false;
        this.GetSensorData();
        console.log("first time");
      }

      console.log(data);

      this.LocationMarker.setPosition(new google.maps.LatLng(data.coords.latitude, data.coords.longitude));

      if (this.distance(this.coord.lat, this.coord.long, this.navParams.get("endAddress").lat, this.navParams.get("endAddress").long, "K") < 0.5)
      {
        console.log("Journey Finished");
        this.ble.disconnect;
        //this.backgroundMode.disable();
      }

      var distance = this.distance(this.coord.lat, this.coord.long, data.coords.latitude, data.coords.longitude, "K");
      //console.log(distance);
      if (distance > 0.1)
      {
        this.coord.lat = data.coords.latitude;
        this.coord.long = data.coords.longitude;
        this.relocate(data.coords.latitude, data.coords.longitude);
      
          //this.backgroundMode.wakeUp();
          this.GetSensorData();
      }
    });
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


}