import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class PatientService {
  patients: any;
  apiUrl: string = "https://donet-azure-fhir-web-api20200804100046.azurewebsites.net";

  constructor(public http: HttpClient) {}

  // Get all the patients
  getPatients() {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + "/api/Patient/pages/5").subscribe(
        (data) => {
          //console.log(data);
          this.patients = data;
          resolve(data);
        },
        (err) => {
          reject(err);
        }
      )
    })
  }
}
