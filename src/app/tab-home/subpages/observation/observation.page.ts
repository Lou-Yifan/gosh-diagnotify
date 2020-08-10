import { Component, OnInit, Output, ViewChild } from "@angular/core";
import { PatientService } from "../../../services/patient.service";
import { ActivatedRoute } from "@angular/router";
import { NavController, IonSlides } from "@ionic/angular";

@Component({
  selector: "app-observation",
  templateUrl: "./observation.page.html",
  styleUrls: ["./observation.page.scss"],
})
export class ObservationPage implements OnInit {
  @ViewChild("slides", {static: true}) slider: IonSlides;
  observations: any;
  observedItems: any;
  loadedPatientId: string;
  segment = 0;

  constructor(
    public patientService: PatientService,
    public activatedRoute: ActivatedRoute,
    public navCtrl: NavController
  ) {}

  ngOnInit() {
    this.InitializeData();
  }

  ionViewDidEnter() {
    this.obtainObservations();
  }

  InitializeData() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("patientId")) {
        this.navCtrl.back();
        return;
      }
      this.loadedPatientId = paramMap.get("patientId");

      // Get observation data from API and store them in the local service
      this.patientService.getObservationsById(this.loadedPatientId);
      //console.log(this.loadedPatientId);
    });
  }

  // Get observation data from local service
  obtainObservations() {
    this.observations = this.patientService.getLocalObservations(
      this.loadedPatientId
    );
    //console.log(this.observations);
    this.observedItems = this.patientService.getLocalObservedItems(
      this.loadedPatientId
    );
    //console.log(this.observedItems);
  }

  async segmentChanged() {
    await this.slider.slideTo(this.segment);
  }

  async slideChanged(){
    this.segment = await this.slider.getActiveIndex();
  }
}
