import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardColorPage } from './card-color.page';

const routes: Routes = [
  {
    path: '',
    component: CardColorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardColorPageRoutingModule {}
