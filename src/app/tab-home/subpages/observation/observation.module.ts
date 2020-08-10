import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ObservationPageRoutingModule } from './observation-routing.module';

import { ObservationPage } from './observation.page';

// Modules
import { ChartsModule } from './charts/charts.module';
import { ObservationListModule } from './observation-list/observation-list.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ObservationPageRoutingModule,
    ChartsModule,
    ObservationListModule
  ],
  declarations: [ObservationPage]
})
export class ObservationPageModule {}
