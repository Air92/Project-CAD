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

  Journey : any;
  extension : any;
  JourneyList : any = [];
  map : any;

  
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {
    
  }

  ngAfterViewInit(){
    console.log('ionViewDidLoad JourneyListPage');
    this.Journey = document.getElementById("JourneyList");
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

   
      var cards  = this.Journey.children;

      

      /*for(var test in this.JourneyList){
        console.log(this.JourneyList[test]);
      }*/

      console.log("hit2");
      for (var i = 0; i < cards.length; i++) {
        console.log(cards[i]);
    }
    console
    
    });
    
  }

  itemSelected(item){
    console.log(item);
    var Journey = document.getElementById(item.id);
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
