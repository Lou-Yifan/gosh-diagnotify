import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WatchListPage } from './tab-watchList.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { WatchListPageRoutingModule } from './tab-watchList-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    WatchListPageRoutingModule
  ],
  declarations: [WatchListPage]
})
export class WatchListPageModule {}
