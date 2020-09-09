import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-color',
  templateUrl: './card-color.page.html',
  styleUrls: ['./card-color.page.scss'],
})
export class CardColorPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  changeColor(color) {
    document.documentElement.style.setProperty('--ion-color-cardcolor', color);
  }

}
