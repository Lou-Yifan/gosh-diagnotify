import { Component, OnInit } from "@angular/core";
import { PatientService } from "../../../services/patient.service";
import { ActivatedRoute } from "@angular/router";
import { NavController } from "@ionic/angular";
import { SettingsService } from 'src/app/services/settings.service';

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
    public navCtrl: NavController,
    public settings: SettingsService,
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
          this.appointments = res;
          //console.log("appointments: ", this.appointments);

          // Get clinician name
          for(let i=0; i<this.appointments.length; i++) {
            this.patientService.getClinicianName(this.appointments[i].clinicianId).subscribe(data => {
              let clinician:any = data;
              //console.log("clinician: ", clinician)
              this.appointments[i]["clinicianName"] = clinician.clinicianName;
              //console.log("appointments: ", this.appointments);
            })
          }

          // sort
          this.appointments.sort((a, b) => {
            if (a.date < b.date) return 1;
            if (a.date > b.date) return -1;
            if (a.date = b.date) {
              if (a.time < b.time) return 1;
              if (a.time > b.time) return -1;
            }
          })
        }, err => {
          console.log(err);
        }
      )
    })
  }

  // Setting card font-size
  myFont(){
    return this.settings.myFont;
  }
}
