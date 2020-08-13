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
  @ViewChild("slides", { static: true }) slider: IonSlides;
  observations: any;
  observedItems: any;
  loadedPatientId: string;
  segment = 0;
  chartData: any;
  label: any;

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
    this.obtainChartData();
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
  }

  // Get chart data
  // {label: [{datetime: object}, {datetime: object}]}
  obtainChartData() {
    let labels: any = [];
    let bp: any = [];
    let bh: any = [];
    let rr: any = [];
    let sr: any = [];
    let reversedObservations = this.patientService.observations.reverse();
    for (let observation of reversedObservations) {
      labels.push(observation.date + " " + observation.time);
      bp.push(observation.observedItems[0].bloodPressures[0]);
      bh.push(observation.observedItems[0].bodyHeats[0]);
      rr.push(observation.observedItems[0].respiratoryRates[0]);
      sr.push(observation.observedItems[0].sinusRhythms[0]);
    }
    //console.log(bp);
    this.label = labels;
    this.chartData = [bp, bh, rr, sr];

    //console.log(this.chartData);
  }

  async segmentChanged() {
    await this.slider.slideTo(this.segment);
  }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }
}
