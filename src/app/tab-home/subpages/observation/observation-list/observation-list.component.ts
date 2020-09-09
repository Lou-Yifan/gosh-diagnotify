import { Component, OnInit, Input } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-observation-list',
  templateUrl: './observation-list.component.html',
  styleUrls: ['./observation-list.component.scss'],
})
export class ObservationListComponent implements OnInit {

  @Input() observations: any;

  constructor(private settings: SettingsService) { }

  ngOnInit() {}

  myFont(){
    return this.settings.myFont;
  }
}
