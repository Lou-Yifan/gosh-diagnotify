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
  chartData = {};

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
    this.observedItems = this.patientService.getLocalObservedItems(
      this.loadedPatientId
    );
    //console.log(this.observedItems);
  }

  // Get chart data
  // {label: [{datetime: object}, {datetime: object}]}
  obtainChartData(){
    let label: any;
    let orderedObsevedItems = this.patientService.observedItems.reverse();
    for (let observedItem of orderedObsevedItems) {
      const observation = this.patientService.observations.find(ob => {
        return ob.observedItemId === observedItem.observedItemId;
      });
      label = observedItem.itemName;
      const labelDatetime = observation.date + " " + observation.time;
      if (!this.chartData[label]){
        this.chartData[label] = [];
      }
      let ob = {};
      ob[labelDatetime] = observedItem
      this.chartData[label].push(ob);
    }
    //console.log(this.chartData);
  }

  async segmentChanged() {
    await this.slider.slideTo(this.segment);
  }

  async slideChanged(){
    this.segment = await this.slider.getActiveIndex();
  }
}
