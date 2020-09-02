import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../login/auth.guard';

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
        redirectTo: '/login-page',
        pathMatch: 'full'
      }
    ],
    //canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/login-page',
    pathMatch: 'full'
  },
  {
    path: 'login-page',
    loadChildren: () => import('../login/login-page/login-page.module').then( m => m.LoginPagePageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
