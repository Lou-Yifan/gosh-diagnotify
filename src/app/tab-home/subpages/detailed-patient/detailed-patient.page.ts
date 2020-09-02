import { Component, OnInit } from "@angular/core";
import { PatientService } from "../../../services/patient.service";
import { ActivatedRoute } from "@angular/router";
import { NavController } from "@ionic/angular";
import { WatchListService } from "../../../services/watch-list.service";

@Component({
  selector: "app-detailed-patient",
  templateUrl: "./detailed-patient.page.html",
  styleUrls: ["./detailed-patient.page.scss"],
})
export class DetailedPatientPage implements OnInit {

  // patient related
  loadedPatient: any;
  loadedImgUrl: any;

  // watchList
  follow: boolean;
  watchPatients: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    public patientService: PatientService,
    public navCtrl: NavController,
    public watchListService: WatchListService
  ) {}

  ngOnInit() {
    this.InitializeData();
  }

  InitializeData() {
    // get patientId in the Url
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("patientId")) {
        this.navCtrl.back();
        return;
      }
      const loadedPatientId = paramMap.get("patientId");
      //console.log("loadedId: ", loadedPatientId);

      this.loadedPatient = this.patientService.getPatientById(loadedPatientId);
      //console.log("loadedPatient: ", this.loadedPatient);
      this.loadedImgUrl = this.patientService.getAvatarById(loadedPatientId);
      //console.log("loadedAvatar: ", this.loadedImgUrl);
      this.watchPatients = this.watchListService.watchPatients;
      //console.log("watchPatients: ", this.watchPatients);

      // set the follow
      this.follow = false;
      for (let patient of this.watchPatients) {
        if (patient.id == loadedPatientId) {
          this.follow = true;
        }
      }
    })
  }

  changeFollowStatus(){
    const patientId = this.loadedPatient.id;
    if (this.follow){
      console.log("Follow this patient");
      this.watchListService.postPatientToWatchList(patientId).subscribe(
        res => {
          // refresh watchPatients
          this.updateWatchPatients();
        }, err => {
          console.log(err);
        }
      )
    } else {
      console.log("Remove this patient");
      this.watchListService.deletePatientInWatchList(patientId).subscribe(
        res => {
          // refresh watchPatients
          this.updateWatchPatients();
        }, err => {
          console.log(err);
        }
      )
    }
  }

  updateWatchPatients() {
    this.watchListService.getWatchPatients().then(data => {
      this.watchListService.getWatchPatientsInfo();
      // set the sign, so that the pages home and watchlist will refresh
      this.watchListService.status_home = true;
      this.watchListService.status_watchList = true;
      console.log("status_home: ", this.watchListService.status_home);
      console.log("status_watchList: ", this.watchListService.status_watchList);
    });
  }
}
