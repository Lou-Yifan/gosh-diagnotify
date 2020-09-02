import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestsComponent } from './tests.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [TestsComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [TestsComponent],
})
export class TestsModule { }
