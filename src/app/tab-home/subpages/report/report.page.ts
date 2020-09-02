import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NavController, IonSlides } from "@ionic/angular";
import { ReportService } from "../../../services/report.service";

@Component({
  selector: "app-report",
  templateUrl: "./report.page.html",
  styleUrls: ["./report.page.scss"],
})
export class ReportPage implements OnInit {
  @ViewChild("slides", { static: true }) slider: IonSlides;
  segment = 0;

  loadedPatientId: string;
  report: any;
  tests: any;

  constructor(
    public activatedRoute: ActivatedRoute,
    public navCtrl: NavController,
    public reportService: ReportService
  ) {}

  ngOnInit() {
    this.InitializeData();
  }

  InitializeData() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("patientId")) {
        this.navCtrl.back();
        return;
      }
      this.loadedPatientId = paramMap.get("patientId");
      //console.log(this.loadedPatientId);
      this.reportService.getReportsByPatient(this.loadedPatientId).then(data => {
        this.report = this.reportService.report;
        //console.log(this.report);
      });
      this.reportService.getTestData(this.loadedPatientId).then(data => {
        this.tests = this.reportService.test;
        //console.log(this.tests);
      })
    });
  }
}
