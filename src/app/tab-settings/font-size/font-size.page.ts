import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';


@Component({
  selector: 'app-font-size',
  templateUrl: './font-size.page.html',
  styleUrls: ['./font-size.page.scss'],
})
export class FontSizePage implements OnInit {

  constructor(private settings:SettingsService) { }

  ngOnInit() {
  }

  changeSize(value){
    this.settings.myFont = value;
  }

  myFont(){
    return this.settings.myFont;
  }

}
