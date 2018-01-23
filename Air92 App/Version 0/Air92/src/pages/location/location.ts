import {
  Component
} from '@angular/core';
import {
  NavController
} from 'ionic-angular';
import {
  Geolocation
} from '@ionic-native/geolocation';
import {
  HTTP
} from '@ionic-native/http';
import {
  Toast
} from '@ionic-native/toast';

import {
  JourneyInitiationPage
} from '../journey-initiation/journey-initiation';
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
export class LocationPage {
  //store map object
  map: any;
  //store user location
  coord: any = {
    long: -2.242631,
    lat: 53.480759
  }
  //marker on map
  marker: any;

  buttons : any = {
    addButton: null,
    deleteButton: null 
  }




  //var for google maps autocomplete
  autoComplete: any;
  //object for start and end location for journey
  searches: any = {
    startSearch: null,
    endSearch: null
  };


  constructor(public navCtrl: NavController, private geolocation: Geolocation, private http: HTTP, private toast: Toast) {

   

  }

  //locate users getting lon and lan 
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


  ngAfterViewInit() {
    //get input elements, get the first tag within the ion-input tag
    this.searches.startSearch = document.getElementById("startSearch").getElementsByTagName('input')[0];
    this.searches.endSearch = document.getElementById("endSearch").getElementsByTagName('input')[0];
    this.buttons.addButton = document.getElementById("addButton");

   
    this.onLocateUser();
    this.initAutoComplete();

    

    

  }

  private addRoute(): void {
    var route = new google.maps.DirectionsService;
    var render = new google.maps.DirectionsRenderer({
      draggable: false,
      map: this.map
    })

    //call function twice
    var startAddress = this.placeDecode1(this.searches.startSearch);
    var endAddress = this.placeDecode1(this.searches.endSearch);
  
    

    //promise all
    Promise.all([endAddress,startAddress]).then(values =>{

      this.renderRoute(route,render,values[1],values[0]);
    })
   

   
  }





  //method convertes input into formatted address
  private placeDecode1(input: HTMLInputElement) {

    var result = new Promise(function(resolve, reject) {
      var location = input.value;

      var geoCode = new google.maps.Geocoder();
      geoCode.geocode({
        address: location
      }, function(result,status){
        if(status == 'OK'){
          console.log(result[0].formatted_address);
          resolve(result[0].formatted_address);
        }
      })
    });

    return result;

  }

  







  private renderRoute(route: any, render: any, start: any, end: any): void {
    console.log("hit");
    route.route(({
      destination: end,
      origin: start,
      travelMode: 'WALKING'
    }), function (response, status) {
      console.log(status);
      if (status === 'OK') {

        render.setDirections(response);
      }
    });

  }





  private mapCreation(): void {

    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: this.coord.lat,
        lng: this.coord.long
      },
      zoom: 15,
      draggable: true,
      fullscreenControl: false
    });
  }



  //show autocomplete searches, passes the id of search input
  initAutoComplete(): void {
    this.autoComplete = new google.maps.places.Autocomplete((this.searches.startSearch));
    this.autoComplete = new google.maps.places.Autocomplete((this.searches.endSearch));
  }

  FocusAutoComplete(){


    this.addButtonCheck();


  }

  addButtonCheck(){
    if(this.searches.startSearch != '' && this.searches.endSearch != ''){
      
    }
  }


  //cancel journey pop from nav stack
  cancelJourney(): void {
    this.navCtrl.pop();
  }

  //add journey
  addJourney(): void {

    this.addRoute();


    /* this.http.get('http://ionic.io', {}, {})
       .then(data => {
 
         console.log(data.status);
         console.log(data.headers);
 
       })
       .catch(error => {
 
         console.log(error.status);
         console.log(error.error); // error message as string
         console.log(error.headers);
 
       });*/

    /* this.toast.show(`Journey Successfully Added`, '5000', 'top').subscribe(
       toast => {
         console.log(toast);
       }
     );*/




  }


}
