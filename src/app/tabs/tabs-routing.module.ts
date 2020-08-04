import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../tab-home/tab-home.module').then(m => m.HomePageModule)
      },
      {
        path: 'watchList',
        loadChildren: () => import('../tab-watchList/tab-watchList.module').then(m => m.WatchListPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../tab-settings/tab-settings.module').then(m => m.SettingsPageModule)
      },
      {
        path: 'user',
        loadChildren: () => import('../tab-user/tab-user.module').then(m => m.UserPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
