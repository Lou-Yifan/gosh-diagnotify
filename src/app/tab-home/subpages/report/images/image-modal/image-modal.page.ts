import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.page.html',
  styleUrls: ['./image-modal.page.scss'],
})
export class ImageModalPage implements OnInit {

  @ViewChild("slider", { read: ElementRef })slider: ElementRef;
  image: any;
  sliderOpts = {
    zoom: {
      maxRatio: 3
    }
  }

  constructor(private navParams: NavParams, private modalController: ModalController) { }

  ngOnInit() {
    this.image = this.navParams.get("image");
  }

  close() {
    console.log('close');
    this.modalController.dismiss();
  }

}
