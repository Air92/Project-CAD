import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocationPage } from '../location/location';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
  
  }

  test(){
    console.log("hit");
    this.navCtrl.push(LocationPage)
  }

}
