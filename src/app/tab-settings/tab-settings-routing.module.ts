import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsPage } from './tab-settings.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage,
  },
  {
    path: 'card-color',
    loadChildren: () => import('./card-color/card-color.module').then( m => m.CardColorPageModule)
  },
  {
    path: 'font-size',
    loadChildren: () => import('./font-size/font-size.module').then( m => m.FontSizePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsPageRoutingModule {}
