import { Component, OnInit } from "@angular/core";
import { ModalController, NavController } from "@ionic/angular";
import { NgForm } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { AlertService } from "src/app/services/alert.service";
import { WatchListService } from 'src/app/services/watch-list.service';

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.page.html",
  styleUrls: ["./login-page.page.scss"],
})
export class LoginPagePage implements OnInit {
  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private watchlistService: WatchListService
  ) {}

  ngOnInit() {}

  // Dismiss Login Modal
  dismissLogin() {
    this.modalController.dismiss();
  }


  login(form: NgForm) {
    this.authService.login(form.value.email, form.value.password).subscribe(
      (data) => {
        //console.log(data);
        this.alertService.presentToast("Logged In");
      },
      (error) => {
        console.log(error);
        this.alertService.presentToast("Wrong password!");
      },
      () => {
        this.watchlistService.email = form.value.email;
        this.navCtrl.navigateRoot("/tabs/home");
      }
    );
  }

}
