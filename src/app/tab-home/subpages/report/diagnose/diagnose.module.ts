import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DiagnoseComponent } from './diagnose.component';



@NgModule({
  declarations: [DiagnoseComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [DiagnoseComponent]
})
export class DiagnoseModule { }
