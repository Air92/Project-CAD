import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JourneyListPage } from './journey-list';

@NgModule({
  declarations: [
    JourneyListPage,
  ],
  imports: [
    IonicPageModule.forChild(JourneyListPage),
  ],
})
export class JourneyListPageModule {}
