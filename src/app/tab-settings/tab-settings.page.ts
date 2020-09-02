import { Component } from '@angular/core';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab-settings.page.html',
  styleUrls: ['tab-settings.page.scss']
})
export class SettingsPage {

  constructor(private settingsService: SettingsService) {}

  changeMode() {
    this.settingsService.toggleTheme();
  }


}
