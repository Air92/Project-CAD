import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { HTTP } from '@ionic-native/http';
import { Toast } from '@ionic-native/toast';
import { HomePage } from '../home/home';
import { JourneyInitiationPage } from '../journey-initiation/journey-initiation';
import {JourneyListPage} from '../journey-list/journey-list';

/**
 * Generated class for the LocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;

//@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage
{

  //store map object
  map: any;
  //store user location
  coord: any = {
    long: null,
    lat: null
  }
  //marker on map
  marker: any;

  buttons: any = {
    addButton: null,
    deleteButton: null
  }

  //var for google maps autocomplete
  autoComplete: any;
  //object for start and end location for journey
  searches: any = {
    startSearch: null,
    endSearch: null,
    name: null
  };


  constructor(public navCtrl: NavController, private geolocation: Geolocation, private http: HTTP, private toast: Toast, public platform: Platform) { }

  ngAfterViewInit()
  {
    console.log('page ready');
    //get input elements, get the first tag within the ion-input tag
    this.searches.startSearch = document.getElementById("startSearch").getElementsByTagName('input')[0];
    this.searches.endSearch = document.getElementById("endSearch").getElementsByTagName('input')[0];
    this.searches.name = document.getElementById("Journey").getElementsByTagName('input')[0];
    this.buttons.addButton = document.getElementById("addButton");

    this.locateUser().then((result) =>
    {
      this.mapGen(document.getElementById('map')).then(() =>
      {
        this.markerCreator(this.coord.lat, this.coord.long);

      })
    });

    this.initAutoComplete();
  }

  public checkFocus()
  {
    console.log('hit');
  }

  public reolocate()
  {
    this.marker.setMap(null);
    this.locateUser().then(() =>
    {
      this.coordEncode(this.coord.lat, this.coord.long).then((result) =>
      {
        this.searches.startSearch.value = result;
      })
      this.map.setCenter(new google.maps.LatLng(this.coord.lat, this.coord.long));
      this.markerCreator(this.coord.lat, this.coord.long);
    })
  }

  //=============================================================Add Route=============================================================
  //generate route on map
  private addRoute()
  {
    console.log(this.searches.startSearch.value);
    if (this.searches.startSearch.value != '' && this.searches.endSearch.value != '')
    {
      var route = new google.maps.DirectionsService;
      var render = new google.maps.DirectionsRenderer({
        draggable: false,
        map: this.map
      })


      var startAddress;
      var endAddress;

      this.placeDecode(this.searches.startSearch.value).then((result) =>
      {
        startAddress = result;
        this.placeDecode(this.searches.endSearch.value).then((result) =>
        {
          endAddress = result;
          console.log(startAddress);
          console.log(endAddress);
          this.renderRoute(route, render, startAddress, endAddress);
        });

      })
    }
  }
  //==================================================================================================================================


  //============================================================= Decode ============================================================= 
  //method convertes input into formatted address
  placeDecode = (address: string) =>
  {
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURI(address) + '&key=' + 'AIzaSyAg2KphKp5UyX6ehRqypZ3HH8ZVpP4pRz8';
    return new Promise((resolve, reject) =>
    {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onload = function (status)
      {
        {
          var result = JSON.parse(xhr.response);
          resolve(result.results[0].geometry.location);
        }
      };
      xhr.send();
    });
  }
  //==================================================================================================================================

  //============================================================= Encode =============================================================
  //Convert co-ordinates to formatted address
  private coordEncode(lat: any, long: any)
  {
    console.log(lat);
    console.log(long);
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.coord.lat + ',' + this.coord.long + '&key=AIzaSyAg2KphKp5UyX6ehRqypZ3HH8ZVpP4pRz8';
    return new Promise((resolve, reject) =>
    {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onload = function (status)
      {
        {
          var result = JSON.parse(xhr.response);
          console.log((result.results[0].formatted_address))
          resolve((result.results[0].formatted_address));
        }
      };
      xhr.send();
    });
  }
  //==================================================================================================================================


  //============================================================= Render ============================================================= 
  //Renders route on map
  private renderRoute(route: any, render: any, start: any, end: any): void
  {
    console.log("hit");
    route.route(({
      destination: end,
      origin: start,
      travelMode: 'WALKING'
    }), function (response, status)
      {
        console.log(status);
        if (status === 'OK')
        {
          render.setDirections(response);
        }
      });

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
        draggable: true,
        fullscreenControl: false
      });
      resolve(map);
    });
  }
  //==================================================================================================================================

  //============================================================= Locate ============================================================= 
  //locates users
  locateUser = () =>
  {
    console.log('user located');
    return new Promise((resolve, reject) =>
    {
      var options = { maximumAge: 0, timeout: 10000, enableHighAccuracy: true };
      this.geolocation.getCurrentPosition(options).then((location) =>
      {
        console.log('success');
        this.coord.long = location.coords.longitude;
        this.coord.lat = location.coords.latitude;
        resolve(location);
      }).catch((error) =>
      {
        console.log(error);
      })
    })
  }
  //==================================================================================================================================

  //============================================================= Marker =============================================================
  //create marker on map
  markerCreator(lat: any, long: any)
  {
    this.marker = new google.maps.Marker({
      map: this.map,
      visible: true,
      position: new google.maps.LatLng(lat, long),
      Icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 5
      },
      clickable: false,
      draggable: false
    })
  }
  //==================================================================================================================================

  //=============================================================Complete=============================================================
  //show autocomplete searches, passes the id of search input
  initAutoComplete(): void
  {
    this.autoComplete = new google.maps.places.Autocomplete((this.searches.startSearch));
    this.autoComplete = new google.maps.places.Autocomplete((this.searches.endSearch));
  }
  //==================================================================================================================================


  //=============================================================Cancel===============================================================
  //cancel journey pop from nav stack
  cancelJourney(): void
  {
    this.navCtrl.setRoot(JourneyListPage);
  }
  //==================================================================================================================================


  //=============================================================Add Jour=============================================================
  //add journey
  addJourney(): void
  {
    if (this.searches.startSearch.value != '' && this.searches.endSearch.value != '' && this.searches.name.value != '')
    {

      var locations = {
        start: null,
        end: null
      }

      this.placeDecode(this.searches.startSearch.value).then((result) =>
      {
        locations.start = result;
        this.placeDecode(this.searches.endSearch.value).then((result) =>
        {
          locations.end = result;

          console.log(locations.start);
          console.log(locations.end);

          this.postData(this.searches.name.value, locations.start, locations.end).then((result) =>
          {
            console.log(result);
            this.toast.show(this.searches.name.value + ' Journey has been added', '5000', 'top', ).subscribe(
              toast =>
              {
                console.log(toast);
              }
            )

            this.navCtrl.setRoot(HomePage);
          });
        })
      })
    }
  }
  //==================================================================================================================================

  public test(){
    this.addRoute();
  }

  //=============================================================Post Data============================================================
  //post data to RestLet database 
  postData = (name: any, start: any, end: any) =>
  {
    var param =
      {
        "name": name,
        "startLat": start.lat,
        "startLong": start.lng,
        "endLat": end.lat,
        "endLong": end.lng,
        "category": "a3c7a200-05bc-11e8-9af9-41fa26177d88"
      };

    console.log(JSON.stringify(param));

    var url = 'https://air92.restlet.net/v1/specificJourneies/';
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
}
//==================================================================================================================================





