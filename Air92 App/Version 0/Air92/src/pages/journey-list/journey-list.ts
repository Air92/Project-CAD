import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { JourneyInitiationPage } from '../journey-initiation/journey-initiation';
import { LocationPage } from '../location/location';
import { ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';

/**
 * Generated class for the JourneyListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


declare var google;

@IonicPage()
@Component({
  selector: 'page-journey-list',
  templateUrl: 'journey-list.html',
})





export class JourneyListPage {
  @ViewChild(Content) content: Content;
  extension : any;
  JourneyList : any = [];
  map : any;

  
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {
    
  }

  ngAfterViewInit(){
    console.log('ionViewDidLoad JourneyListPage');
    this.ListDisplay();
   

  }

  public add(){
    this.navCtrl.push(LocationPage);

  }

  public go(){
    this.navCtrl.push(JourneyInitiationPage);
  }

  
  ListDisplay(){
    this.getJounreyList().then((result)=> {
      var p = result;

      console.log("hit");
      for (var key in p) {
        this.JourneyList.push(p[key]);
      }
    });

   
    
  }

  itemSelected(item){
    console.log(item);
    var map = document.getElementById(item.id + " Map");

    if(map.style.padding != "50%"){
      map.style.padding = "50%";
     
    }else{
      map.style.padding = "0%";
    }
 
    this.mapGen(map);
    var startAddress = {
      lat : item.startLat,
      long : item.startLong
    }

    var endAddress = {
      lat : item.endLat,
      long : item.endLong
    }

    this.addRoute(startAddress,endAddress)
  }

  private addRoute(startAddress : any, endAddress: any)
  {
      var route = new google.maps.DirectionsService;
      var render = new google.maps.DirectionsRenderer({
        draggable: false,
        map: this.map
      });


      var start = new google.maps.LatLng(startAddress.lat,startAddress.long );
      var end = new google.maps.LatLng(endAddress.lat,endAddress.long);

      this.renderRoute(route, render, start, end);
       
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
          lat: 51.507351,
          lng: -0.127758
        },
        zoom: 15,
        styles:[
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

  

  getJounreyList = () =>
  {
    var url = 'https://air92.restlet.net/v1/specificJourneies/?media=json'
    return new Promise(function (resolve, reject)
    {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onload = function ()
      {
          var result = JSON.parse(xhr.response);
          resolve(result);
      };
      xhr.send();
    });
  }

}
