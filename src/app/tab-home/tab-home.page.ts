import { Component, ɵConsole } from "@angular/core";
import { PatientService } from "../services/patient.service";
import { WatchListService } from "../services/watch-list.service";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-tab1",
  templateUrl: "tab-home.page.html",
  styleUrls: ["tab-home.page.scss"],
})
export class HomePage {
  // api related
  token: any;

  // patient related
  patients: any;

  // watchList related
  watchPatients: any;

  constructor(
    public patientService: PatientService,
    public watchListService: WatchListService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.InitializeData();
  }

  ionViewDidEnter() {
    this.updateCheck();
  }

  InitializeData() {
    //console.log("email: ", this.watchListService.email);
    this.watchListService.getUser().subscribe((data) => {
      //console.log("user: ", data);
      let user: any = data;
      this.watchListService.clinicianId = user[0].clinicianId;
      // Get all the data from API
      let p = this.patientService.getPatients();
      let w = this.watchListService.getWatchPatients();
      let i = this.patientService.getAvatars();

      Promise.all([p, w]).then((data) => {
        this.patients = this.patientService.patients;
        //console.log("patients: ", this.patients);
        this.watchListService.getWatchPatientsInfo();
        this.watchPatients = this.watchListService.watchPatients;
        //console.log("watchPatients: ", this.watchPatients);
      });
    });
  }

  // If the patient is followed, the mark should be lighted
  checkIfFollowed(patient: any) {
    //console.log(patient.id);
    for (let watchPatient of this.watchPatients) {
      if (watchPatient.id === patient.id) {
        return "warning";
      }
    }
    return "light";
  }

  // Search function
  searchPatient(ev: any) {
    this.patients = this.patientService.patients;
    const val = ev.target.value;
    if (val && val.trim() != "") {
      this.patients = this.patients.filter((patient) => {
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
    if (this.watchListService.status_home) {
      this.watchPatients = this.watchListService.watchPatients;
      this.watchListService.status_home = false;
      console.log("status_home: ", this.watchListService.status_home);
    }
  }

  // Follow and cancel
  follow(patientId) {
    console.log("follow this patient");
    this.watchListService.postPatientToWatchList(patientId).subscribe(
      (res) => {
        // refresh watchPatients
        this.updateWatchPatients();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  unfollow(patientId) {
    console.log("cancel following this patient");
    this.watchListService.deletePatientInWatchList(patientId).subscribe(
      (res) => {
        // refresh watchPatients
        this.updateWatchPatients();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateWatchPatients() {
    this.watchListService.getWatchPatients().then((data) => {
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
