import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class ReportService {
  report: any;
  test: any;
  apiUrl: string;
  myApiUrl: string;

  token: any;
  headers: any;

  headers_api: any;

  constructor(
    public http: HttpClient,
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
    this.headers = new HttpHeaders({
      Authorization: "Bearer" + " " + this.token,
    });
  }

  // ***********************
  // Get reports
  // ***********************

  getReportsByPatient(patientId: string) {
    this.setHeaders();
    this.myApiUrl = this.authService.myApiUrl;
    return new Promise((resolve, reject) => {
      this.http
        .get(this.myApiUrl + "/api/Report/Patient/" + patientId, {
          headers: this.headers,
        })
        .subscribe(
          (data) => {
            //console.log(data);
            this.report = data;
            resolve(this.report);
          },
          (err) => {
            console.log(err);
            reject(err);
          }
        );
    });
  }

  getTestData(patientId: string) {
    this.setHeaders();
    this.apiUrl = this.authService.apiUrl;
    this.headers_api = this.authService.headers_api;
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + "/api/LabResults/" + patientId, {headers: this.headers_api}).subscribe(
        (data) => {
          //console.log(data);
          this.test = data;
          resolve(this.test);
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      );
    });
  }

  obtainReport() {
    return this.report;
  }

  obtainTest() {
    return this.test;
  }
}
