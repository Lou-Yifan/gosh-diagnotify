import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserPage } from './tab-user.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { UserPageRoutingModule } from './tab-user-routing.module'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: UserPage }]),
    UserPageRoutingModule,
  ],
  declarations: [UserPage]
})
export class UserPageModule {}
