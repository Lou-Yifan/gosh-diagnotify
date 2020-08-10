import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObservationListComponent } from './observation-list.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [ObservationListComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [ObservationListComponent]
})
export class ObservationListModule { }
