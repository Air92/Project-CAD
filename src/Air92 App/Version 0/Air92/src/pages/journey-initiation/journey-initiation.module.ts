import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JourneyInitiationPage } from './journey-initiation';

@NgModule({
  declarations: [
    JourneyInitiationPage,
  ],
  imports: [
    IonicPageModule.forChild(JourneyInitiationPage),
  ],
})
export class JourneyInitiationPageModule {}
