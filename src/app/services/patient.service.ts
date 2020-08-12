import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class PatientService {
  patients: any;
  apiUrl: string = "https://donet-azure-fhir-web-api20200804100046.azurewebsites.net";
  myApiUrl: string = "https://localhost:5004";

  // Observation Page
  observations: any; // store {patientId: observations}
  observedItems: any = []; // store {patientId: observationItems}

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

  // *****************************************************************************************
  // Observation Related
  // *****************************************************************************************

  // Get observations and observedItems
  getObservationsById(patientId: string){

    // Get all the observations of a patient by Id
    return this.http.get(this.myApiUrl+"/api/Observation/Patient/"+patientId).subscribe(data => {
      const mydata: any = data;
      // sort the observations to make the latest one first
      this.observations = mydata.sort((a, b) => {
        if (a.date < b.date) return 1;
        if (a.date > b.date) return -1;
        if (a.date = b.date) {
          if (a.time < b.time) return 1;
          if (a.time > b.time) return -1;
        }
      });
      //console.log(data);
    
      // Get all the observed items accordingly
      this.observedItems = [];
      const allObserves: any = data;
      for (let observation of allObserves) {
        this.http.get(this.myApiUrl+"/api/ObservedItem/Item/"+observation.observedItemId).subscribe(data => {
          const observedLists: any = data;
          for (let singleObserve of observedLists) {
            this.observedItems.push(singleObserve);
          }
        })
      }
    });
  }

  // Get local observation data
  getLocalObservations(patientId: string){
    return this.observations;
  }

  getLocalObservedItems(patientId: string){
    return this.observedItems;
  }


}
