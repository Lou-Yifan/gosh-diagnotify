import { Component, OnInit, Input } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss'],
})
export class TestsComponent implements OnInit {
  @Input() tests: any;

  constructor(private settings: SettingsService) { }

  ngOnInit() {}

  myFont(){
    return this.settings.myFont;
  }
}
