import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { PatientService } from "../services/patient.service";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class WatchListService {
  // api
  myApiUrl: string;
  token: any;
  headers: any;

  // watchList
  watchPatientIds: any;
  watchPatients: any = [];

  // For home and watchList page to distinguish if watchList has changed
  status_home: boolean = false;
  status_watchList: boolean = false;

  // account
  email: any;
  clinicianId: any;
  clinicianName: any;

  constructor(
    public http: HttpClient,
    public patientService: PatientService,
    public authService: AuthService
  ) {}

  // **************************
  // Get token and set headers
  // **************************

  getToken() {
    this.token = this.authService.getToken();
  }

  setHeaders() {
    this.getToken();
    this.token = this.authService.token;
    //console.log(this.token);
    this.headers = new HttpHeaders({
      Authorization: "Bearer" + " " + this.token,
    });
  }

  // Get user
  getUser() {
    this.setHeaders();
    this.myApiUrl = this.authService.myApiUrl;
    return this.http.get(this.myApiUrl + "/api/Clinician/Email/" + this.email, {
      headers: this.headers,
    });
  }

  // ***************************
  // WatchList Related
  // ***************************

  // Get all the patients in the watchList
  getWatchPatients() {
    this.setHeaders();
    this.myApiUrl = this.authService.myApiUrl;
    //console.log("ClinicianId: ", this.clinicianId);
    return new Promise((resolve, reject) => {
      this.http
        .get(this.myApiUrl + "/api/WatchList/Clinician/" + this.clinicianId, {
          headers: this.headers,
        })
        .subscribe(
          (res) => {
            //console.log(res);
            this.watchPatientIds = res;
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  // Return watchPatients
  getWatchPatientsInfo() {
    this.watchPatients = [];
    for (let patient of this.watchPatientIds) {
      const loadedPatient = this.patientService.getPatientById(
        patient.patientId
      );
      this.watchPatients.push(loadedPatient);
    }
    //console.log("watchPatients: ", this.watchPatients);
  }

  // Post a patient to watchList
  postPatientToWatchList(patientId: string) {
    this.setHeaders();
    this.myApiUrl = this.authService.myApiUrl;
    const savedPatient = {
      ClinicianId: this.clinicianId,
      PatientId: patientId,
    };
    return this.http.post(this.myApiUrl + "/api/WatchList", savedPatient, {
      headers: this.headers,
    });
  }

  // Delete a patient in watchList
  deletePatientInWatchList(patientId: string) {
    this.setHeaders();
    this.myApiUrl = this.authService.myApiUrl;
    return this.http.delete(
      this.myApiUrl +
        "/api/WatchList/Patient/" +
        this.clinicianId +
        "/" +
        patientId,
      { headers: this.headers }
    );
  }
}
