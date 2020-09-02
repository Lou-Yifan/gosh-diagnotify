import { Component, OnInit, Input } from "@angular/core";
import { PhotoViewer } from "@ionic-native/photo-viewer/ngx";
import { Platform } from "@ionic/angular";

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

  constructor(public platform: Platform, public viewer: PhotoViewer) {
    this.platform.ready();
  }

  ngOnInit() { 
    this.InitializeData();
  }

  InitializeData() {
    //console.log("images: ", this.images);

    // Get all CT images
    this.image_CT = this.images.filter(img => {
      if (img.imageName == "CT Scan") {
        return img;
      }
    }).map(img => {
      return img.imageUrl;
    });
    //console.log("image_CT: ", this.image_CT);

    // Get all MRI images
    this.image_MRI = this.images.filter(img => {
      if (img.imageName == "MRI") {
        return img;
      }
    }).map(img => {
      return img.imageUrl;
    });
    //console.log("image_MRI: ", this.image_MRI);
  }


  ZoomPhoto(url) {
    this.viewer.show(url, "", {share: true});
  }
}
