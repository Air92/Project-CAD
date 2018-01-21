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




  //var for google maps autocomplete
  autoComplete: any;
  //object for start and end location for journey
  searches: any = {
    startSearch: null,
    endSearch: null
  };


  constructor(public navCtrl: NavController, private geolocation: Geolocation, private http: HTTP, private toast: Toast) {

    this.onLocateUser();

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





  }

  private addRoute(): void {
    var route = new google.maps.DirectionsService;
    var render = new google.maps.DirectionsRenderer({
      draggable: false,
      map: this.map
    })

    this.renderRoute(route, render);

  }

  private renderRoute(route: any, render: any): void {


    route.route(({
      destination: 'Sydney, NSW',
      origin: 'Perth, WA',
      travelMode: 'DRIVING'
    }), function (response, status) {
      if (status = 'OK') {



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
  initAutoComplete(search: String): void {

    if (search == 'startSearch') {
      this.autoComplete = new google.maps.places.Autocomplete((this.searches.startSearch));

    } else if (search == 'endSearch') {
      this.autoComplete = new google.maps.places.Autocomplete((this.searches.endSearch));
    }

    this.geolocate();
    console.log(this.coord.long);

  }

  //set the autocomplete to search near users location
  private geolocate(): void {

    var circle = new google.maps.Circle({
      center: (new google.maps.LatLng(this.coord.lat, this.coord.lon)),
      radius: 10
    });
    this.autoComplete.setBounds(circle.getBounds());
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
