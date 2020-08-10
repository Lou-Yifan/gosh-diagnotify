import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsComponent } from './charts.component'
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ChartsComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [ChartsComponent]
})
export class ChartsModule { }
