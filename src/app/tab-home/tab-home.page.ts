import { Component } from "@angular/core";
import { PatientService } from "../services/patient.service";
import { WatchListService } from "../services/watch-list.service";

@Component({
  selector: "app-tab1",
  templateUrl: "tab-home.page.html",
  styleUrls: ["tab-home.page.scss"],
})
export class HomePage {
  patients;
  imgUrl: string = "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2429260349,2150036447&fm=26&gp=0.jpg";
  watchPatients: any;

  constructor(
    public patientService: PatientService,
    public watchListService: WatchListService
  ) {}

  ngOnInit() {

  }

  ionViewDidEnter(){
    this.patientService.getPatients().then((data) => {
      this.InitializeData();
    });
  }

  InitializeData() {
    this.watchListService.getWatchPatients().then(data => {
      this.patients = this.patientService.patients;
      this.watchPatients = this.watchListService.watchPatients;
      //console.log(this.watchPatients);
    })
  }

  checkIfFollowed(patient:any){
    //console.log(patient.id);
    for (let watchPatient of this.watchPatients){
      if (watchPatient.id === patient.id) {
        return "warning";
      }
    }
    return "light";
  }

  searchPatient(ev: any) {
    this.patients = this.patientService.patients;
    const val = ev.target.value;
    if (val && val.trim() != "") {
      this.patients = this.patients.filter((patient) => {
        return patient.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }
  }
}
