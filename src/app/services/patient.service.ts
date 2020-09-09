import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: "root",
})
export class PatientService {

  // API related
  apiUrl: string = "https://donet-azure-fhir-web-api20200804100046.azurewebsites.net";
  myApiUrl: string = "https://diagnotify-app-myapi.azurewebsites.net";
  token: any;
  headers: any;
  headers_api: any;

  // Patient related
  patients: any;
  avatars: any;
  defaultAvatar = "https://diagnotifyimages.blob.core.windows.net/diagnotify-container/avatarDefault.png";

  // Observation Page
  observations: any; // store {patientId: observations}
  observedItems: any = []; // store {patientId: observationItems}

  constructor(public http: HttpClient, public authService: AuthService) {
  }

  // **************************
  // Get token and set headers
  // **************************

  getToken() {
    this.token = this.authService.getToken();
  }

  setHeaders() {
    this.getToken();
    this.token = this.authService.token;
    this.headers = new HttpHeaders({
      Authorization:
        "Bearer" + " " + this.token,
    });
  }

 
  // ***************************
  // Patient Related
  // ***************************

  // Get all the patients
  getPatients() {
    this.apiUrl = this.authService.apiUrl;
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + "/api/Patient/pages/5", {headers: this.headers_api}).subscribe(
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

  // Get all avatar urls
  // The avatars should be stroed with patient information, but here I save all the avatars 
  // together in my database. So here I get all the avatars at once for convenience. 
  getAvatars() {
    this.setHeaders();
    this.myApiUrl = this.authService.myApiUrl;
    return new Promise((res, rej) => {
      this.http.get(this.myApiUrl+"/api/Patient", {headers: this.headers}).subscribe(data => {
        this.avatars = data;
        //console.log("avatars: ", this.avatars);
        res(data);
      }, err => {
        rej(err);
      })
    })
  }

  // Get the avatar of patient, if the patient is not included in database, return default avatar
  getAvatarById(patientId: string) {
    if(this.avatars != null) {
      for (let patient of this.avatars) {
        if (patient.patientId == patientId) {
          return patient.imgUrl
        }
      }
    }
    return this.defaultAvatar;
  }

  // **************************
  // Appointment Related
  // **************************

  // Get all the appointments of a patient by Id
  getAppointmentsById(patientId){
    this.setHeaders();
    this.myApiUrl = this.authService.myApiUrl;
    return this.http.get(this.myApiUrl+"/api/Appointment/Patient/"+patientId, {headers: this.headers});
  }

  // Get the name of clinician
  getClinicianName(clinicianId){
    this.setHeaders();
    this.myApiUrl = this.authService.myApiUrl;
    return this.http.get(this.myApiUrl+"/api/Clinician/"+clinicianId, {headers: this.headers});
  }

  // *****************************************************************************************
  // Observation Related
  // *****************************************************************************************

  // Get observations and observedItems
  getObservationsById(patientId: string){
    this.setHeaders();
    this.myApiUrl = this.authService.myApiUrl;
    // Get all the observations of a patient by Id
    return this.http.get(this.myApiUrl+"/api/Observation/Patient/"+patientId, {headers: this.headers});
  }


}
