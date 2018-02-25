import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {LocationPage} from '../pages/location/location';
import {JourneyInitiationPage} from '../pages/journey-initiation/journey-initiation';
import {LoginPage} from '../pages/login/login';
import {JourneyListPage} from '../pages/journey-list/journey-list';
import {RegisterPage} from '../pages/register/register';
import { CreditsPage } from '../pages/credits/credits';

import { Geolocation } from '@ionic-native/geolocation';
import { HTTP } from '@ionic-native/http';
/**
 * ionic cordova plugin add cordova-plugin-advanced-http
 * npm install --save @ionic-native/http
 */
import { Toast } from '@ionic-native/toast';
/**
 * ionic cordova plugin add cordova-plugin-x-toast
 * npm install --save @ionic-native/toast
 */

import { AndroidPermissions } from '@ionic-native/android-permissions';
/**
 * ionic cordova plugin add cordova-plugin-android-permissions
 * npm install --save @ionic-native/android-permissions
 */

import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
/**
 * ionic cordova plugin add cordova-plugin-bluetooth-serial
 * npm install --save @ionic-native/bluetooth-serial
 */

import { Vibration } from '@ionic-native/vibration';
/**
 * ionic cordova plugin add cordova-plugin-vibration
 * npm install --save @ionic-native/vibration
 */


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicPageModule } from 'ionic-angular/module';

import { SideBarComponent } from '../components/side-bar/side-bar';






@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LocationPage,
    SideBarComponent,
    JourneyInitiationPage,
    LoginPage,
    JourneyListPage,
    RegisterPage,
    CreditsPage


  ],
  imports: [
    BrowserModule,
 //   BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
    IonicPageModule.forChild(LocationPage)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LocationPage,
    JourneyInitiationPage,
    LoginPage,
    JourneyListPage,
    RegisterPage,
    CreditsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    HTTP,
    Toast,
    BluetoothSerial,
    AndroidPermissions,
    Vibration,

    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
  
})
export class AppModule {}
Geolocation;