import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { LocationPage } from '../location/location';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { LoginPage } from '../login/login';
import { JourneyListPage} from '../journey-list/journey-list';
import { RegisterPage} from '../register/register';
import { CreditsPage } from '../credits/credits';
import { JourneyInitiationPage } from '../journey-initiation/journey-initiation';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public platform: Platform, private androidPermissions: AndroidPermissions) {

   

   
    
    
  
  }

  ngAfterViewInit()
  {
    console.log('start v1');
    this.platform.ready().then(() => {
      console.log('platform ready');
      this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION);
      
    })

    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION);

  }

  test(){
    console.log("hit");
    this.navCtrl.setRoot(LocationPage)
  }

  button2(){
    this.navCtrl.setRoot(LocationPage);
  }

  pageNav(){
    console.log("hit");
    this.navCtrl.push(LoginPage)
  }

  registerNav(){
    console.log("hit");
    this.navCtrl.push(RegisterPage)
  }

  journeylist(){
    this.navCtrl.push(JourneyListPage);
  }

  public credits(){
    this.navCtrl.push(CreditsPage);
  }
  journeyInit()
  {
    this.navCtrl.push(JourneyInitiationPage);
  }

}
