import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { JourneyInitiationPage } from '../journey-initiation/journey-initiation';
import { LocationPage } from '../location/location';

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

  extension : any;
  JourneyList : any;
  map : any;

  
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {
     this.ListDisplay();
  }

  ngAfterViewInit(){
    console.log('ionViewDidLoad JourneyListPage');
    /* this.extension = document.getElementById("extension");
    this.extension.style.visibility = "hidden"; */
   
    
    this.platform.ready().then(() => {
      this.mapGen(document.getElementById('locMap'));
      

    });
  

  }

   //============================================================= MapGen =============================================================
  //generates map on passed element
  mapGen = (map: Element) =>
  {
    return new Promise((resolve, reject) =>
    {
      this.map = new google.maps.Map(map, {
        center: {
          lat: 53.4717481,
          lng: -2.2399314
        },
        zoom: 15,
        draggable: true,
        fullscreenControl: false
      });
      resolve(map);
    });
  }
  //==================================================================================================================================

  public add(){
    this.navCtrl.push(LocationPage);

  }

  public go(){
    this.navCtrl.push(JourneyInitiationPage);
  }

  
  ListDisplay(){
    this.getJounreyList().then((result)=> {
      console.log(result);
      this.JourneyList = Object.keys(result);
    });
    
  }

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
