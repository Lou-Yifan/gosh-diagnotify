import { Component } from "@angular/core";
import { WatchListService } from "../services/watch-list.service";
import { PatientService } from "../services/patient.service";

@Component({
  selector: "app-tab2",
  templateUrl: "tab-watchList.page.html",
  styleUrls: ["tab-watchList.page.scss"],
})
export class WatchListPage {
  watchPatients: any[] = [];
  userId: string = "U123456";
  imgUrl = 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2429260349,2150036447&fm=26&gp=0.jpg';


  constructor(
    public watchListService: WatchListService,
    public patientService: PatientService
  ) {}

  ngOnInit() {
    this.patientService.getPatients().then(data =>{
      this.InitializeData();
    })
  }

  InitializeData() {
    this.watchListService.getWatchPatients(this.userId).subscribe(
      (res) => {
        console.log(res);
        const patientList: any = res;
        for (let patient of patientList) {
          //console.log(patient.patientId);
          const loadedPatient = this.patientService.getPatientById(patient.patientId);
          this.watchPatients.push(loadedPatient);
          //console.log(this.watchPatients);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
