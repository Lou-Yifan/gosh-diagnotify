import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ModalController, MenuController, NavController } from "@ionic/angular";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab-user.page.html',
  styleUrls: ['tab-user.page.scss']
})
export class UserPage {

  constructor(public authService: AuthService, private navCtrl: NavController) {}

  logout() {
    this.authService.logout();
    this.navCtrl.navigateRoot('/landing-page');
  }

}
