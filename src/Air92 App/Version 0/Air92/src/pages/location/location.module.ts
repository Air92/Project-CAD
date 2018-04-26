import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationPage } from './location';
import { JourneyInitiationPage } from '../journey-initiation/journey-initiation';


@NgModule({
  declarations: [
    LocationPage,
    JourneyInitiationPage
  ],
  imports: [
    IonicPageModule.forChild(LocationPage),
  ],
})
export class LocationPageModule {}
