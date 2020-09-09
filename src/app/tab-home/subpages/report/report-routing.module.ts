import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportPage } from './report.page';

const routes: Routes = [
  {
    path: '',
    component: ReportPage
  },
  {
    path: 'image-modal',
    loadChildren: () => import('./images/image-modal/image-modal.module').then( m => m.ImageModalPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportPageRoutingModule {}
