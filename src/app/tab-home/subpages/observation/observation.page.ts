import { Component, OnInit } from "@angular/core";
import { PatientService } from "../../../services/patient.service";
import { ActivatedRoute } from "@angular/router";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-observation",
  templateUrl: "./observation.page.html",
  styleUrls: ["./observation.page.scss"],
})
export class ObservationPage implements OnInit {
  observations: any;
  observedItems: any[] = [];

  constructor(
    public patientService: PatientService,
    public activatedRoute: ActivatedRoute,
    public navCtrl: NavController
  ) {}

  ngOnInit() {
    this.InitializeData();
  }

  InitializeData(){
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has("patientId")) {
        this.navCtrl.back();
        return;
      }
      const loadedPatientId = paramMap.get("patientId");
      console.log(loadedPatientId);
      this.patientService.getObservationsById(loadedPatientId).subscribe(
        res => {
          //console.log(res);
          this.observations = res;

          for (let observation of this.observations) {
            this.getObservedItems(observation.observedItemId);
          }
        }
      )
    })
  }

  getObservedItems(observedItemId: string){
    this.patientService.getObservedItemsByObservedId(observedItemId).subscribe(
      res => {
        //console.log(res);
        const observations: any = res;
        for (let observation of observations) {
          this.observedItems.push(observation);
        }
        //console.log(this.observedItems);
      }, err => {
        console.log(err);
      }
    )
  }
}
