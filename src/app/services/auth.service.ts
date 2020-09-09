import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { NativeStorage } from "@ionic-native/native-storage/ngx";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  // setting
  apiUrl: string = "https://donet-azure-fhir-web-api20200804100046.azurewebsites.net";
  myApiUrl: string = "https://diagnotify-app-myapi.azurewebsites.net";
  headers_api: any = new HttpHeaders({
    Instance: "https://login.microsoftonline.com/{0}",
    Tenant: "ca254449-06ec-4e1d-a3c9-f8b84e2afe3f",
    ClientId: "0f6332f4-c060-49fc-bcf6-548982d56569",
    ClientSecret: "ux@CJAaxCD85A9psm-Wdb?x3/Z4c6gp9",
    BaseAddress: "https://gosh-fhir-synth.azurehealthcareapis.com",
    Scope: "https://gosh-fhir-synth.azurehealthcareapis.com/.default"
  })


  isLoggedIn = false;
  token: any;

  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
  ) {}

  // *************************
  // Login related
  // *************************

  login(email: String, password: String) {
    const loginData = { Email: email, Password: password };
    return this.http
      .post(this.myApiUrl + "/api/token", loginData, { responseType: "text" })
      .pipe(
        tap((token) => {
          this.storage.setItem("token", token).then(
            () => {
              console.log("Token Stored");
            },
            (error) => console.error("Error storing item", error)
          );
          //this.token = token;
          this.isLoggedIn = true;
          return token;
        })
      );
  }

  logout() {
    this.getToken();
    console.log(this.token);
    if (this.token != null) {
      this.storage.remove("token");
    }
      this.isLoggedIn = false;
      delete this.token;
      return "Already logout";
  }

  getUser() {
    const headers = new HttpHeaders({
      Authorization:
        this.token["token_type"] + " " + this.token["access_token"],
    });
    return this.http
      .get(this.myApiUrl + "api/Clinician", { headers: headers })
      .pipe(
        tap((user) => {
          return user;
        })
      );
  }

  // getToken() {
  //   return this.storage.getItem("token").then(
  //     (data) => {
  //       this.token = data;
  //       if (this.token != null) {
  //         this.isLoggedIn = true;
  //       } else {
  //         this.isLoggedIn = false;
  //       }
  //     },
  //     (error) => {
  //       this.token = null;
  //       this.isLoggedIn = false;
  //     }
  //   );
  // }

  //For test
  getToken() {
    this.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJIZWFsdGhTZXJ2aWNlQWNjZXNzVG9rZW4iLCJqdGkiOiIxZjViZmRlZC1kZTMzLTRiMDUtOGE4Zi1kMmNlZGVhYmM4MjgiLCJpYXQiOiI5LzkvMjAyMCA3OjUyOjI1IFBNIiwiQ2xpbmljaWFuSWQiOiJDMDAwMSIsIkNsaW5pY2lhbk5hbWUiOiJKb3NlcGggV29vZHMiLCJFbWFpbCI6InlpZmFuLmxvdUB1Y2wuYWMudWsiLCJleHAiOjE1OTk3Njc1NDUsImlzcyI6IkhlYWx0aEF1dGhlbnRpY2F0aW9uU2VydmVyIiwiYXVkIjoiSGVhbHRoU2VydmljZVBvc3RtYW5DbGllbnQifQ.WKjk0XVA68zaRYztpZkwtv6SLLPX7iaoH-RIrpOjSLw";
    return this.token;
  }
}
