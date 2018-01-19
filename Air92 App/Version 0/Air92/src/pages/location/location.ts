import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';


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
  //store user location
  location: any;
  //var for google maps autocomplete
  autoComplete: any;
  //object for start and end location for journey
  searches: any = {
    startSearch: null,
    endSearch: null
  };


  constructor(public navCtrl: NavController, private geolocation: Geolocation) {
  }

  //locate users getting lon and lan 
  onLocateUser() {
    this.geolocation.getCurrentPosition()
      .then((location) => {
        console.log('sucess');
        this.location = location;

      })
      .catch((error) => {
        console.log('Error getting location', error);
      });

  }

 
  ngAfterViewInit() {
    //get input elements, get the first tag within the ion-input tag
    this.searches.startSearch = document.getElementById("startSearch").getElementsByTagName('input')[0];
    this.searches.endSearch = document.getElementById("endSearch").getElementsByTagName('input')[0];

  
    this.onLocateUser();
    

  }

  //show autocomplete searches, passes the id of search input
  initAutoComplete(search: String) {
    if (search == 'startSearch') {
      this.autoComplete = new google.maps.places.Autocomplete((this.searches.startSearch));
    }
    else if (search == 'endSearch') {
      this.autoComplete = new google.maps.places.Autocomplete((this.searches.endSearch));
    }

  }

  //set the autocomplete to search near users location
  geolocate() {
    var geolocation = {
      lat: this.location.coords.latitude,
      lng: this.location.coords.longitude
    };
    var circle = new google.maps.Circle({
      center: geolocation,
      radius: this.location.coords.accuracy
    });
    this.autoComplete.setBounds(circle.getBounds());
  }

  //cancel journey pop from nav stack
  cancelJourney(){
    console.log("hit");
    this.navCtrl.pop();
  }

  //add journey
  addJourney(){
    

  }


}
