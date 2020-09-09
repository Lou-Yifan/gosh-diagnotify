import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardColorPageRoutingModule } from './card-color-routing.module';

import { CardColorPage } from './card-color.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardColorPageRoutingModule
  ],
  declarations: [CardColorPage]
})
export class CardColorPageModule {}
