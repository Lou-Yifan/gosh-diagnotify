import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportsPageRoutingModule } from './reports-routing.module';

import { ReportsPage } from './reports.page';
import { DiagnoseModule } from '../diagnose/diagnose.module';
import { ImagesModule } from '../images/images.module';
import { MedicationsModule } from '../medications/medications.module';
import { TestsModule } from '../tests/tests.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportsPageRoutingModule,
    DiagnoseModule,
    ImagesModule,
    MedicationsModule,
    TestsModule
  ],
  declarations: [ReportsPage]
})
export class ReportsPageModule {}
