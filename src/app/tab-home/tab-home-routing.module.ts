import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './tab-home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'Patient/:patientId',
    loadChildren: () => import('./subpages/detailed-patient/detailed-patient.module').then( m => m.DetailedPatientPageModule)
  },
  {
    path: 'Patient/Appointments/:patientId',
    loadChildren: () => import('./subpages/appointment/appointment.module').then( m => m.AppointmentPageModule)
  },
  {
    path: 'Patient/Observations/:patientId',
    loadChildren: () => import('./subpages/observation/observation.module').then( m => m.ObservationPageModule)
  },
  {
    path: 'Patient/Reports/:patientId',
    loadChildren: () => import('./subpages/report/report.module').then( m => m.ReportPageModule)
  },
  {
    path: 'Patient/Reports/Report/:reportId',
    loadChildren: () => import('./subpages/report/reports/reports.module').then( m => m.ReportsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
