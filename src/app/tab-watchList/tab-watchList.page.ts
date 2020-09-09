import { Component } from "@angular/core";
import { WatchListService } from "../services/watch-list.service";
import { PatientService } from "../services/patient.service";

@Component({
  selector: "app-tab2",
  templateUrl: "tab-watchList.page.html",
  styleUrls: ["tab-watchList.page.scss"],
})
export class WatchListPage {

  // watchList
  watchPatients: any;

  constructor(
    public watchListService: WatchListService,
    public patientService: PatientService
  ) {}

  ngOnInit() {
    this.watchPatients = this.watchListService.watchPatients;
  }

  ionViewDidEnter() {
    this.updateCheck();
  }

  // Search function
  searchPatient(ev: any) {
    this.watchPatients = this.watchListService.watchPatients;
    const val = ev.target.value;
    if (val && val.trim() != "") {
      this.watchPatients = this.watchPatients.filter((patient) => {
        return patient.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }
  }

  // Get the avatar of every patient
  obtainAvatar(patientId: string) {
    return this.patientService.getAvatarById(patientId);
  }

  // check if watchPatients has updated
  updateCheck() {
    if (this.watchListService.status_watchList) {
      this.watchPatients = this.watchListService.watchPatients;
      this.watchListService.status_watchList = false;
      console.log("status_watchlist: ", this.watchListService.status_watchList);
    }
  }

  // Cancel following a patient
  unfollow(patientId){
    console.log("cancel following this patient");
    this.watchListService.deletePatientInWatchList(patientId).subscribe(
      res => {
        // refresh watchPatients
        this.updateWatchPatients();
      }, err => {
        console.log(err);
      }
    )
  }

  updateWatchPatients() {
    this.watchListService.getWatchPatients().then(data => {
      this.watchListService.getWatchPatientsInfo();
      // set the sign, so that the pages home and watchlist will refresh
      this.watchListService.status_home = true;
      this.watchListService.status_watchList = true;
      console.log("status_home: ", this.watchListService.status_home);
      console.log("status_watchList: ", this.watchListService.status_watchList);
      this.updateCheck();
    });
  }

}
