import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { Chart } from "chart.js";
import * as ChartAnnotation from "chartjs-plugin-annotation";
import { bindCallback } from 'rxjs';

@Component({
  selector: "app-charts",
  templateUrl: "./charts.component.html",
  styleUrls: ["./charts.component.scss"],
})
export class ChartsComponent implements OnInit {
  @Input() label: any;
  @Input() labelData: any;

  @ViewChild("barChart_week", { static: true }) barChart_week;
  @ViewChild("barChart_month", { static: true }) barChart_month;
  @ViewChild("barChart_year", { static: true }) barChart_year;
  @ViewChild("barChart_all", { static: true }) barChart_all;

  segment_chart = "chart_all";
  bars_week: any;
  bars_month: any;
  bars_year: any;
  bars_all: any;

  markLines = {
    'Blood Pressure': [[85, 140], [60, 90]],
    'Heart Rate': [[60, 100], [null, null]],
    'Respiratory': [[16, 20], [null, null]],
    'Temperature': [[36, 37.4], [null, null]]
  };

  labels_week: any = [];
  data_week: any = [];
  labels_month: any = [];
  data_month: any = [];
  labels_year: any = [];
  data_year:any = [];
  labels_all: any = [];
  data_all: any = [];

  data_week_2: any = [];
  data_month_2: any = [];
  data_year_2:any = [];
  data_all_2: any = [];

  labels = [
    new Date("2015-08-24 12:20:15"),
    new Date("2015-08-23 16:30:55"),
    new Date("2015-08-27 12:20:15"),
    new Date("2015-08-27 2:20:15"),
    new Date("2015-08-27 10:24:10"),
  ];
  testData = ['70', '50', '60', '90', '80'];

  constructor() {}

  ngOnInit() {
    this.InitializeData()
    this.CreateBarChart_week();
    this.CreateBarChart_month();
    this.CreateBarChart_year();
    this.CreateBarChart_all();
  }

  ionViewDidEnter() {}

  InitializeData() {
    //console.log(this.label);
    //console.log(this.labelData);
    for (let data of this.labelData) {
      for (let datetime in data) {
        this.labels_all.push(new Date(datetime));
        // check if there are two figures like '75/120'
        let index = data[datetime].value.indexOf('/');
        if (index > -1){
          this.data_all.push(data[datetime].value.slice(0, index));
          this.data_all_2.push(data[datetime].value.slice(index+1));
        } else {
          this.data_all.push(data[datetime].value);
        }
      }
    }
    //console.log(this.labels_all);
    //console.log(this.data_all);
    //console.log(this.data_all_2);

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();
    const weekDate = new Date(year, month, day-currentDate.getDay())
    const monthDate = new Date(year, month);
    const yearDate = new Date(year, 0);
    let weekIndex = this.labels_all.length;
    let monthIndex =this.labels_all.length; 
    let yearIndex = this.labels_all.length;
    for(let i=this.labels_all.length; i>-1; i--) {
      if (this.labels_all[i]>weekDate) {
        weekIndex = i;
      }
      if (this.labels_all[i]>monthDate) {
        monthIndex = i;
      }
      if (this.labels_all[i]>yearDate) {
        yearIndex = i;
      }
    }
    this.labels_year = this.labels_all.slice(yearIndex);
    this.data_year = this.data_all.slice(yearIndex);
    this.labels_month = this.labels_all.slice(monthIndex);
    this.data_month = this.data_all.slice(monthIndex);
    this.labels_week = this.labels_all.slice(weekIndex);
    this.data_week = this.data_all.slice(weekIndex);
    if (this.data_all_2 != []) {
      this.data_year_2 = this.data_all_2.slice(yearIndex);
      this.data_month_2 = this.data_all_2.slice(monthIndex);
      this.data_week_2 = this.data_all_2.slice(weekIndex);
    }
  }

  segmentChanged_chart(ev) {
    //console.log(ev);
  }

  CreateBarChart_all() {
    this.bars_all = new Chart(this.barChart_all.nativeElement, {
      type: "line",
      plugins: [ChartAnnotation],
      data: {
        labels: this.labels_all,
        datasets: [
          {
            label: this.label,
            fill: false,
            borderColor: "#4169e1",
            borderWidth: 2,
            pointBackgroundColor: "#4169e1",
            pointBorderColor: "rgba(0,0,0,0)",
            pointBorderWidth: 1,
            pointRadius: 3,
            data: this.data_all,
          },
          {
            label: this.label,
            fill: false,
            borderColor: "#3cb371",
            borderWidth: 2,
            pointBackgroundColor: "#3cb371",
            pointBorderColor: "rgba(0,0,0,0)",
            pointBorderWidth: 1,
            pointRadius: 3,
            data: this.data_all_2,
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: this.label,
          fontSize: 16,
          fontColor: "rgba(0,0,0,1)",
          padding: 14,
        },
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
              value: this.markLines[this.label][0][0],
              borderColor: "#4169e1",
              label: {
                enabled: false,
              },
            },
            {
              type: "line",
              mode: "horizontal",
              scaleID: "y-axis-0",
              value: this.markLines[this.label][0][1],
              borderColor: "#4169e1",
              label: {
                enabled: false,
              },
            },
            {
              type: "line",
              mode: "horizontal",
              scaleID: "y-axis-0",
              value: this.markLines[this.label][1][0],
              borderColor: "#3cb371",
              label: {
                enabled: false,
              },
            },
            {
              type: "line",
              mode: "horizontal",
              scaleID: "y-axis-0",
              value: this.markLines[this.label][1][1],
              borderColor: "#3cb371",
              label: {
                enabled: false,
              },
            },
          ],
        },
        scales: {
          xAxes: [
            {
              type: "time",
              distribution: 'series',
              time: {
                parser: "DD-MM-YYYY HH:mm",
                tooltipFormat: 'll HH:mm',
                unit: 'month',
                unitStepSize: 1,
                displayFormats: {
                  'month': 'DD/YYYY'
                }
              }
            },
          ],
          yAxes: [
            {
              beginAtZero: false,
            }
          ],
        },
      },
    });
  }

  CreateBarChart_week() {
    this.bars_week = new Chart(this.barChart_week.nativeElement, {
      type: "line",
      plugins: [ChartAnnotation],
      data: {
        labels: this.labels_week,
        datasets: [
          {
            label: this.label,
            fill: false,
            borderColor: "#4169e1",
            borderWidth: 2,
            pointBackgroundColor: "#4169e1",
            pointBorderColor: "rgba(0,0,0,0)",
            pointBorderWidth: 1,
            pointRadius: 3,
            data: this.data_week,
          },
          {
            label: this.label,
            fill: false,
            borderColor: "#3cb371",
            borderWidth: 2,
            pointBackgroundColor: "#3cb371",
            pointBorderColor: "rgba(0,0,0,0)",
            pointBorderWidth: 1,
            pointRadius: 3,
            data: this.data_week_2,
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: this.label,
          fontSize: 16,
          fontColor: "rgba(0,0,0,1)",
          padding: 14,
        },
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
              value: this.markLines[this.label][0][0],
              borderColor: "#4169e1",
              label: {
                enabled: false,
              },
            },
            {
              type: "line",
              mode: "horizontal",
              scaleID: "y-axis-0",
              value: this.markLines[this.label][0][1],
              borderColor: "#4169e1",
              label: {
                enabled: false,
              },
            },
            {
              type: "line",
              mode: "horizontal",
              scaleID: "y-axis-0",
              value: this.markLines[this.label][1][0],
              borderColor: "#3cb371",
              label: {
                enabled: false,
              },
            },
            {
              type: "line",
              mode: "horizontal",
              scaleID: "y-axis-0",
              value: this.markLines[this.label][1][1],
              borderColor: "#3cb371",
              label: {
                enabled: false,
              },
            },
          ],
        },
        scales: {
          xAxes: [
            {
              type: "time",
              distribution: 'series',
              time: {
                parser: "DD-MM-YYYY HH:mm",
                tooltipFormat: 'll HH:mm',
                unit: 'day',
                unitStepSize: 1,
                displayFormats: {
                  'day': 'MM/DD'
                }
              }
            },
          ],
          yAxes: [
            {
              beginAtZero: false,
            }
          ],
        },
      },
    });
  }

  CreateBarChart_month() {
    this.bars_month = new Chart(this.barChart_month.nativeElement, {
      type: "line",
      plugins: [ChartAnnotation],
      data: {
        labels: this.labels_month,
        datasets: [
          {
            label: this.label,
            fill: false,
            borderColor: "#4169e1",
            borderWidth: 2,
            pointBackgroundColor: "#4169e1",
            pointBorderColor: "rgba(0,0,0,0)",
            pointBorderWidth: 1,
            pointRadius: 3,
            data: this.data_month,
          },
          {
            label: this.label,
            fill: false,
            borderColor: "#3cb371",
            borderWidth: 2,
            pointBackgroundColor: "#3cb371",
            pointBorderColor: "rgba(0,0,0,0)",
            pointBorderWidth: 1,
            pointRadius: 3,
            data: this.data_month_2,
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: this.label,
          fontSize: 16,
          fontColor: "rgba(0,0,0,1)",
          padding: 14,
        },
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
              value: this.markLines[this.label][0][0],
              borderColor: "#4169e1",
              label: {
                enabled: false,
              },
            },
            {
              type: "line",
              mode: "horizontal",
              scaleID: "y-axis-0",
              value: this.markLines[this.label][0][1],
              borderColor: "#4169e1",
              label: {
                enabled: false,
              },
            },
            {
              type: "line",
              mode: "horizontal",
              scaleID: "y-axis-0",
              value: this.markLines[this.label][1][0],
              borderColor: "#3cb371",
              label: {
                enabled: false,
              },
            },
            {
              type: "line",
              mode: "horizontal",
              scaleID: "y-axis-0",
              value: this.markLines[this.label][1][1],
              borderColor: "#3cb371",
              label: {
                enabled: false,
              },
            },
          ],
        },
        scales: {
          xAxes: [
            {
              type: "time",
              distribution: 'series',
              time: {
                parser: "DD-MM-YYYY HH:mm",
                tooltipFormat: 'll HH:mm',
                unit: 'day',
                unitStepSize: 1,
                displayFormats: {
                  'day': 'MM/DD'
                }
              }
            },
          ],
          yAxes: [
            {
              beginAtZero: false,
            }
          ],
        },
      },
    });
  }

  CreateBarChart_year() {
    this.bars_year = new Chart(this.barChart_year.nativeElement, {
      type: "line",
      plugins: [ChartAnnotation],
      data: {
        labels: this.labels_year,
        datasets: [
          {
            label: this.label,
            fill: false,
            borderColor: "#4169e1",
            borderWidth: 2,
            pointBackgroundColor: "#4169e1",
            pointBorderColor: "rgba(0,0,0,0)",
            pointBorderWidth: 1,
            pointRadius: 3,
            data: this.data_year,
          },
          {
            label: this.label,
            fill: false,
            borderColor: "#3cb371",
            borderWidth: 2,
            pointBackgroundColor: "#3cb371",
            pointBorderColor: "rgba(0,0,0,0)",
            pointBorderWidth: 1,
            pointRadius: 3,
            data: this.data_year_2,
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: this.label,
          fontSize: 16,
          fontColor: "rgba(0,0,0,1)",
          padding: 14,
        },
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
              value: this.markLines[this.label][0][0],
              borderColor: "#4169e1",
              label: {
                enabled: false,
              },
            },
            {
              type: "line",
              mode: "horizontal",
              scaleID: "y-axis-0",
              value: this.markLines[this.label][0][1],
              borderColor: "#4169e1",
              label: {
                enabled: false,
              },
            },
            {
              type: "line",
              mode: "horizontal",
              scaleID: "y-axis-0",
              value: this.markLines[this.label][1][0],
              borderColor: "#3cb371",
              label: {
                enabled: false,
              },
            },
            {
              type: "line",
              mode: "horizontal",
              scaleID: "y-axis-0",
              value: this.markLines[this.label][1][1],
              borderColor: "#3cb371",
              label: {
                enabled: false,
              },
            },
          ],
        },
        scales: {
          xAxes: [
            {
              type: "time",
              distribution: 'series',
              time: {
                parser: "DD-MM-YYYY HH:mm",
                tooltipFormat: 'll HH:mm',
                unit: 'month',
                unitStepSize: 1,
                displayFormats: {
                  'month': 'DD/YYYY'
                }
              }
            },
          ],
          yAxes: [
            {
              beginAtZero: false,
            }
          ],
        },
      },
    });
  }



}
