import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ModalController, MenuController, NavController } from "@ionic/angular";
import { WatchListService } from '../services/watch-list.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab-user.page.html',
  styleUrls: ['tab-user.page.scss']
})
export class UserPage {
  clinicianId;
  email;
  clinicianName;

  constructor(public authService: AuthService, private navCtrl: NavController, private watchListService: WatchListService) {}

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.InitializeData();
  }

  InitializeData() {
    this.email = this.watchListService.email;
    this.clinicianId = this.watchListService.clinicianId;
    this.clinicianName = this.watchListService.clinicianName;
  }

  logout() {
    this.authService.logout();
    this.navCtrl.navigateRoot('/login-page');
  }

}
