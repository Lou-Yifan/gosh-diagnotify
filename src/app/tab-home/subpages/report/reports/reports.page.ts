import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NavController, IonSlides } from "@ionic/angular";
import { ReportService } from "../../../../services/report.service";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {
  @ViewChild("slides", { static: true }) slider: IonSlides;
  segment = 0;

  reportId: string;
  report: any;
  datetime: any;
  images: any;
  diagnoses: any;
  medications: any;
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
      if (!paramMap.has("reportId")) {
        this.navCtrl.back();
        return;
      }
      this.reportId = paramMap.get("reportId");

      // Get all the data
      //console.log(this.reportId);
      this.report = this.reportService.report.filter(rep => {
        //console.log(rep);
        if (rep.reportId == this.reportId) {
          return rep
        }
      });
      //console.log(this.report);
      this.tests = this.reportService.test;
      //console.log(this.tests);
      this.datetime = this.report[0].datetime;
      this.images = this.report[0].images;
      this.diagnoses = this.report[0].diagnoses;
      this.medications = this.report[0].medications[0].medicines;
      //console.log("datetime: ", this.datetime);
      //console.log("images: ", this.images);
      //console.log("diagnoses: ", this.diagnoses);
      //console.log("medications: ", this.medications);
    });
  }

  // Segment and slide changed together
  async segmentChanged() {
    await this.slider.slideTo(this.segment);
  }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }
}
