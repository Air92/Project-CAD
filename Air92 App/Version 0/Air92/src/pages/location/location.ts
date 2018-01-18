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
location : any;
placeSearch : any;
startSearch : any;

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

  placesSearchInput : any;
  ngAfterViewInit() {
      this.placesSearchInput =  document.getElementById("startSearch").getElementsByTagName('input')[0];
      
    }
  
    initAutoComplete(){
      console.log("hit");
      console.log(this.placesSearchInput);
      this.startSearch = new google.maps.places.Autocomplete((this.placesSearchInput));
  
  }

 
 

   // This example displays an address form, using the autocomplete feature
      // of the Google Places API to help users fill in the information.

      // This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

       



      



}
