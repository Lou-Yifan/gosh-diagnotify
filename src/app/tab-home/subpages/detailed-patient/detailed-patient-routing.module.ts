import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailedPatientPage } from './detailed-patient.page';

const routes: Routes = [
  {
    path: '',
    component: DetailedPatientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailedPatientPageRoutingModule {}
