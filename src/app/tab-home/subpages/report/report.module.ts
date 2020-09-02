import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportPageRoutingModule } from './report-routing.module';

import { ReportPage } from './report.page';

import { DiagnoseModule } from './diagnose/diagnose.module';
import { ImagesModule } from './images/images.module';
import { MedicationsModule } from './medications/medications.module';
import { TestsModule } from './tests/tests.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportPageRoutingModule,
    DiagnoseModule,
    ImagesModule,
    MedicationsModule,
    TestsModule
  ],
  declarations: [ReportPage]
})
export class ReportPageModule {}
