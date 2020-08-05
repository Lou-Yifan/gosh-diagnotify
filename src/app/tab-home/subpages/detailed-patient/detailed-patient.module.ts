import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailedPatientPageRoutingModule } from './detailed-patient-routing.module';

import { DetailedPatientPage } from './detailed-patient.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailedPatientPageRoutingModule
  ],
  declarations: [DetailedPatientPage]
})
export class DetailedPatientPageModule {}
