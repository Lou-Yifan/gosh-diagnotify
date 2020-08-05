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
  loadedPatient: any;
  //imgUrl = 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2429260349,2150036447&fm=26&gp=0.jpg';
  loadedImgUrl: any;
  follow: boolean = true;

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
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("patientId")) {
        this.navCtrl.back();
        return;
      }
      const loadedPatientId = paramMap.get("patientId");
      //console.log(loadedPatientId);
      this.loadedPatient = this.patientService.getPatientById(loadedPatientId);
      //console.log(this.loadedPatient);

      this.patientService.getImgById(loadedPatientId).subscribe(
        res => {
          //console.log(res);
          if (res['imgUrl']){
            this.loadedImgUrl = res['imgUrl'];
          } else {
            this.loadedImgUrl = '';
          }
        }, err => {
          console.log(err);
        }
      )
    })
  }

  changeFollowStatus(){
    console.log(this.follow);
    if (this.follow){
      console.log("add patient");
      const patientId = this.loadedPatient.id;
      this.watchListService.postPatientToWatchList(patientId).subscribe(
        res => {
          console.log(res);
        }, err => {
          console.log(err);
        }
      )
    } else {
      console.log("remove patient");
    }
  }
}
