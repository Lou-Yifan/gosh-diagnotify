import { Component, OnInit, Input } from "@angular/core";
import { Platform, ModalController } from "@ionic/angular";
import { ImageModalPage } from './image-modal/image-modal.page';

@Component({
  selector: "app-images",
  templateUrl: "./images.component.html",
  styleUrls: ["./images.component.scss"],
})
export class ImagesComponent implements OnInit {
  @Input() images: any[];
  @Input() datetime: any[];

  image_CT: any;
  image_MRI: any;
  sliderOpts = {
    zoom: false,
  }

  constructor(
    public platform: Platform,
    private modalController: ModalController
  ) {
    this.platform.ready();
  }

  ngOnInit() {
    this.InitializeData();
  }

  InitializeData() {
    //console.log("images: ", this.images);

    // Get all CT images
    this.image_CT = this.images
      .filter((img) => {
        if (img.imageName == "CT Scan") {
          return img;
        }
      })
      .map((img) => {
        return img.imageUrl;
      });
    //console.log("image_CT: ", this.image_CT);

    // Get all MRI images
    this.image_MRI = this.images
      .filter((img) => {
        if (img.imageName == "MRI") {
          return img;
        }
      })
      .map((img) => {
        return img.imageUrl;
      });
    console.log("image_MRI: ", this.image_MRI);
  }

  openPreview(image) {
    this.modalController.create({
      component: ImageModalPage,
      componentProps: {
        image: image
      }
    }).then(modal => modal.present());
  }

}
