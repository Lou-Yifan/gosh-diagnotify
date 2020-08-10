import { Component, OnInit, ViewChild } from "@angular/core";
import { Chart } from "chart.js";
import * as ChartAnnotation from "chartjs-plugin-annotation";
import { read } from 'fs';

@Component({
  selector: "app-charts",
  templateUrl: "./charts.component.html",
  styleUrls: ["./charts.component.scss"],
})
export class ChartsComponent implements OnInit {
  @ViewChild("barChart_week", { static: true }) barChart_week;
  @ViewChild("barChart_month", { static: true }) barChart_month;
  @ViewChild("barChart_year", { static: true }) barChart_year;
  @ViewChild("barChart_all", { static: true }) barChart_all;

  segment_chart = "chart_week";
  bars_week: any;
  bars_month: any;
  bars_year: any;
  bars_all: any;
  chart_gloable = {
    scaleShowVerticalLines: true,
  };

  constructor() {}

  ngOnInit() {
    this.CreateBarChart_week();
    this.CreateBarChart_month();
    this.CreateBarChart_year();
    this.CreateBarChart_all();
  }

  ionViewDidEnter() {}

  segmentChanged_chart(ev) {
    console.log(ev);
  }

  CreateBarChart_week() {
    this.bars_week = new Chart(this.barChart_week.nativeElement, {
      type: "line",
      plugins: [ChartAnnotation],
      data: {
        labels: [
          "JAN",
          "FEB",
          "MAR",
          "APR",
          "MAY",
          "JUN",
          "JUL",
          "AUG",
          "SEP",
          "OCT",
          "NOV",
          "DEC",
        ],
        datasets: [
          {
            label: "Heart Rate",
            fill: false,
            borderColor: "rgba(72,209,204,1)",
            borderWidth: 2,
            // point style
            pointBackgroundColor: "rgba(0,139,139,1)",
            pointBorderColor: "rgba(0,0,0,0)",
            pointBorderWidth: 1,
            pointRadius: 3,
            data: [12, 3, 2, 1, 8, 8, 2, 2, 3, 5, 7, 1],
          },
        ],
      },
      options: {
        tooltips: {
          mode: "nearest",
          intersect: false,
        },
        annotation: {
          annotations: [
            {
              type: "line",
              mode: "horizontal",
              scaleID: "y-axis-0",
              value: 8,
              borderColor: "red",
              label: {
                backgroundColor: "rgba(0,0,0,0)",
                fontSize: 12,
                fontColor: "rgba(0,0,0,1)",
                content: "max",
                enabled: false,
                position: "right",
                xAdjust: 0,
                yAdjust: 0,
              },
            },
          ],
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }

  CreateBarChart_month() {
    this.bars_month = new Chart(this.barChart_month.nativeElement, {
      type: "line",
      data: {
        labels: ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"],
        datasets: [
          {
            label: "Viewers in millions",
            data: [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
            backgroundColor: "rgba(0,0,0,0)", // array should have same number of elements as number of dataset
            borderColor: "rgb(38, 194, 129)", // array should have same number of elements as number of dataset
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }

  CreateBarChart_year() {
    this.bars_year = new Chart(this.barChart_year.nativeElement, {
      type: "line",
      data: {
        labels: ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"],
        datasets: [
          {
            label: "Viewers in millions",
            data: [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
            backgroundColor: "rgba(0,0,0,0)", // array should have same number of elements as number of dataset
            borderColor: "rgb(38, 194, 129)", // array should have same number of elements as number of dataset
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }

  CreateBarChart_all() {
    this.bars_all = new Chart(this.barChart_all.nativeElement, {
      type: "line",
      data: {
        labels: ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"],
        datasets: [
          {
            label: "Viewers in millions",
            data: [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
            backgroundColor: "rgba(0,0,0,0)", // array should have same number of elements as number of dataset
            borderColor: "rgb(38, 194, 129)", // array should have same number of elements as number of dataset
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }
}
