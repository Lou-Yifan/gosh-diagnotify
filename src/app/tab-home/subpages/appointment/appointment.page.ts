import { Component, OnInit } from "@angular/core";
import { PatientService } from "../../../services/patient.service";
import { ActivatedRoute } from "@angular/router";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-appointment",
  templateUrl: "./appointment.page.html",
  styleUrls: ["./appointment.page.scss"],
})
export class AppointmentPage implements OnInit {
  appointments: any;

  constructor(
    public patientService: PatientService,
    public activatedRoute: ActivatedRoute,
    public navCtrl: NavController
  ) {}

  ngOnInit() {
    this.InitializeData();
  }

  InitializeData() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has("patientId")) {
        this.navCtrl.back();
        return;
      }
      const loadedPatientId = paramMap.get("patientId");
      //console.log(loadedPatientId);
      this.patientService.getAppointmentsById(loadedPatientId).subscribe(
        res => {
          //console.log(res);
          this.appointments = res;
        }, err => {
          console.log(err);
        }
      )
    })
  }
}