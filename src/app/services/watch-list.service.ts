import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class WatchListService {
  watchPatients: any;
  myApiUrl: string = "https://localhost:5004";
  userId: string = "U123456";

  constructor(public http: HttpClient) {}

  // Get all the patients in the watchList
  getWatchPatients() {
    return this.http.get(this.myApiUrl + "/api/WatchList/User/" + this.userId);
  }

  // Post a patient to watchList
  postPatientToWatchList(patientId: string) {
    const savedPatient= {
      UserId: this.userId,
      PatientId: patientId
    }
    return this.http.post(this.myApiUrl + "/api/WatchList", savedPatient, {
      headers: new HttpHeaders({ "content-Type": "application/json" }),
    });
  }
}
