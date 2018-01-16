import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {LocationPage} from '../pages/location/location';
import { Geolocation } from '@ionic-native/geolocation';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicPageModule } from 'ionic-angular/module';

import { SideBarComponent } from '../components/side-bar/side-bar';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LocationPage,
    SideBarComponent

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
    LocationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
  
})
export class AppModule {}
Geolocation;