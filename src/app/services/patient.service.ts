import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class PatientService {
  patients: any;
  apiUrl: string = "https://donet-azure-fhir-web-api20200804100046.azurewebsites.net";
  myApiUrl: string = "https://localhost:5004";

  constructor(public http: HttpClient) {}

  // ***************************
  // Patient Related
  // ***************************

  // Get all the patients
  getPatients() {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + "/api/Patient/pages/5").subscribe(
        data => {
          //console.log(data);
          this.patients = data;
          resolve(data);
        },
        err => {
          reject(err);
        }
      )
    })
  }

  // Find a patient by 
  getPatientById(patientId: string){
    //console.log(this.patients);
    return this.patients.find(patient => {
      return patient.id === patientId;
    })
  }

  // Get the ImgUrl of a patient by Id
  getImgById(patientId: string){
    return this.http.get(this.myApiUrl+"/api/Patient/"+patientId);
  }

  // **************************
  // Appointment Related
  // **************************

  // Get all the appointments of a patient by Id
  getAppointmentsById(patientId){
    return this.http.get(this.myApiUrl+"/api/Appointment/Patient/"+patientId);
  }

  // **************************
  // Observation Related
  // **************************

  // Get all the observations of a patient by Id
  getObservationsById(patientId: string){
    return this.http.get(this.myApiUrl+"/api/Observation/Patient/"+patientId);
  }

  // Get the details of observation by observationId
  getObservedItemsByObservedId(observedItemId: string){
    return this.http.get(this.myApiUrl+"/api/ObservedItem/Item/"+observedItemId);
  }

}
