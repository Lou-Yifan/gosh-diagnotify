import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ImagesComponent } from './images.component';



@NgModule({
  declarations: [ImagesComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [ImagesComponent]
})
export class ImagesModule { }
