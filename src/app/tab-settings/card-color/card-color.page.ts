import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-color',
  templateUrl: './card-color.page.html',
  styleUrls: ['./card-color.page.scss'],
})
export class CardColorPage implements OnInit {

  borderColor = [
    {'border': '2px solid rgb(0, 0, 0)'},
    {'border': '1px solid rgb(136, 135, 135)'},
    {'border': '1px solid rgb(136, 135, 135)'},
    {'border': '1px solid rgb(136, 135, 135)'},
    {'border': '1px solid rgb(136, 135, 135)'},
    {'border': '1px solid rgb(136, 135, 135)'}
  ]

  constructor() { }

  ngOnInit() {
  }

  changeColor(color) {
    document.documentElement.style.setProperty('--ion-color-cardcolor', color);
    this.changeBorder(color);
  }

  changeBorder(color) {
    let defaultBorder = [
      {'border': '1px solid rgb(136, 135, 135)'},
      {'border': '1px solid rgb(136, 135, 135)'},
      {'border': '1px solid rgb(136, 135, 135)'},
      {'border': '1px solid rgb(136, 135, 135)'},
      {'border': '1px solid rgb(136, 135, 135)'},
      {'border': '1px solid rgb(136, 135, 135)'}
    ];
    let colors = ['#ffffff', '#f0fcff', '#fcefe8', '#e0f0e9', '#f0e8e0', '#eee0f0'];
    let index = colors.indexOf(color);
    defaultBorder[index] = {'border': '2px solid rgb(0, 0, 0)'};
    this.borderColor = defaultBorder;
  }

}
