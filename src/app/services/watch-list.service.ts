import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { PatientService } from "../services/patient.service";

@Injectable({
  providedIn: "root",
})
export class WatchListService {
  watchPatients: any = [];
  myApiUrl: string = "https://localhost:5004";
  clinicianId: string = "C0001";

  constructor(public http: HttpClient, public patientService: PatientService) {}

  // Get all the patients in the watchList
  getWatchPatients() {
    return new Promise((resolve, reject) => {
      this.http.get(this.myApiUrl + "/api/WatchList/Clinician/" + this.clinicianId).subscribe(
        res => {
        //console.log(res);
        const patientList: any = res;
        this.watchPatients = [];
        for (let patient of patientList) {
          //console.log(patient.patientId);
          const loadedPatient = this.patientService.getPatientById(
            patient.patientId
          );
          this.watchPatients.push(loadedPatient);
          //console.log(this.watchPatients);
        }
        resolve(this.watchPatients);
      }, err => {
        reject(err);
      }
      );
    })
    
  }

  // Return watchPatients
  returnWatchPatient(){
    return this.watchPatients;
  }

  // Post a patient to watchList
  postPatientToWatchList(patientId: string) {
    const savedPatient = {
      ClinicianId: this.clinicianId,
      PatientId: patientId,
    };
    return this.http.post(this.myApiUrl + "/api/WatchList", savedPatient, {
      headers: new HttpHeaders({ "content-Type": "application/json" }),
    });
  }

  // Delete a patient in watchList
  deletePatientInWatchList(patientId: string) {
    return this.http.delete(
      this.myApiUrl + "/api/WatchList/Patient/" + this.clinicianId + "/" + patientId
    );
  }
}
