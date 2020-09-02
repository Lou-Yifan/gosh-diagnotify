import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MedicationsComponent } from './medications.component';



@NgModule({
  declarations: [MedicationsComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [MedicationsComponent]
})
export class MedicationsModule { }
