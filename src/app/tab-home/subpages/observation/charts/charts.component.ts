import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { Chart } from "chart.js";
import * as ChartAnnotation from "chartjs-plugin-annotation";

@Component({
  selector: "app-charts",
  templateUrl: "./charts.component.html",
  styleUrls: ["./charts.component.scss"],
})
export class ChartsComponent implements OnInit {
  @Input() labels: any;
  @Input() labelData: any;

  @ViewChild("barChart_week", { static: true }) barChart_week;
  @ViewChild("barChart_month", { static: true }) barChart_month;
  @ViewChild("barChart_year", { static: true }) barChart_year;
  @ViewChild("barChart_all", { static: true }) barChart_all;

  markLines = {
    'Blood Pressure': [[85, 140], [60, 90]],
    'Sinus Rhythm': [[60, 100], [null, null]],
    'Respiratory Rate': [[16, 20], [null, null]],
    'Body Heat': [[36, 37.4], [null, null]]
  };

  segment_chart = "chart_all";
  bars_week: any;
  bars_month: any;
  bars_year: any;
  bars_all: any;

  unit: any;
  label: any;

  labels_week: any = [];
  dataSet_week: any = [];
  labels_month: any = [];
  dataSet_month: any = []
  labels_year: any = [];
  dataSet_year: any = [];
  labels_all: any = [];
  dataSet_all: any = [];



  constructor() {}

  ngOnInit() {
    this.InitializeData()
    this.CreateBarChart_week();
    this.CreateBarChart_month();
    this.CreateBarChart_year();
    this.CreateBarChart_all();
  }

  InitializeData() {

    let data_week: any = [];
    let data_week_2: any = [];
    let data_month: any = [];
    let data_month_2: any = [];
    let data_year:any = [];
    let data_year_2:any = [];
    let data_all: any = [];
    let data_all_2: any = [];

    for (let date of this.labels) {
      this.labels_all.push(new Date(date));
    }
    for (let value of this.labelData) {
      // check if there are two figures like '75/120'
      let index = value.value.indexOf('/');
      if (index > -1){
        data_all.push(value.value.slice(0, index));
        data_all_2.push(value.value.slice(index+1));
        this.label = value.item;
        this.unit = value.unit;
      } else {
        data_all.push(value.value);
        this.label = value.item;
        this.unit = value.unit;
      }
    }
    //console.log(this.label);
    // console.log(this.labels_all);
    // console.log(this.data_all);
    // console.log(this.data_all_2);

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
    data_year = data_all.slice(yearIndex);
    this.labels_month = this.labels_all.slice(monthIndex);
    data_month = data_all.slice(monthIndex);
    this.labels_week = this.labels_all.slice(weekIndex);
    data_week = data_all.slice(weekIndex);

    if (data_all_2 != []) {
      data_year_2 = data_all_2.slice(yearIndex);
      data_month_2 = data_all_2.slice(monthIndex);
      data_week_2 = data_all_2.slice(weekIndex);
    }

    this.dataSet_all = this.getDataSet(data_all, data_all_2);
    this.dataSet_week = this.getDataSet(data_week, data_week_2);
    this.dataSet_month = this.getDataSet(data_month, data_month_2);
    this.dataSet_year = this.getDataSet(data_year, data_year_2);

    //console.log(this.dataSet_all);
  }

  getDataSet(data1, data2){
    if (data2.length == 0) {
      return [{
        label: this.label,
        fill: false,
        borderColor: "#4169e1",
        borderWidth: 2,
        pointBackgroundColor: "#4169e1",
        pointBorderColor: "rgba(0,0,0,0)",
        pointBorderWidth: 1,
        pointRadius: 0,
        data: data1,
      }]
    } else {
      return [
        {
          label: this.label,
          fill: false,
          borderColor: "#4169e1",
          borderWidth: 2,
          pointBackgroundColor: "#4169e1",
          pointBorderColor: "rgba(0,0,0,0)",
          pointBorderWidth: 1,
          pointRadius: 0,
          data: data1,
        },{
          label: this.label,
          fill: false,
          borderColor: "#3cb371",
          borderWidth: 2,
          pointBackgroundColor: "#3cb371",
          pointBorderColor: "rgba(0,0,0,0)",
          pointBorderWidth: 1,
          pointRadius: 0,
          data: data2,
        }
      ]
    }
  }

  getAnnotation(label){
    let result = [];
    for (let i of [0, 1]) {
      for (let j of [0, 1]) {
        if (this.markLines[label][i][j] != null && i == 0) {
          result.push(this.changeAnno(this.markLines[label][i][j], "#4169e1"));
        } else {
          if (this.markLines[label][i][j] != null && i == 1) {
            result.push(this.changeAnno(this.markLines[label][i][j], "#3cb371"));
          }
        }
      }
    }
    return result;
  }

  changeAnno(value: any, color: any){
    return {
      type: "line",
      mode: "horizontal",
      scaleID: "y-axis-0",
      value: value,
      borderColor: color,
      label: {
        enabled: false,
      }
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
        datasets: this.dataSet_all,
      },
      options: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: this.label,
          fontSize: 16,
          padding: 14,
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        annotation: {
          annotations: this.getAnnotation(this.label),
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
                  'month': 'MM/YYYY'
                }
              }
            },
          ],
          yAxes: [
            {
              display: true,
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
        datasets: this.dataSet_week,
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
          mode: "index",
          intersect: false,
        },
        annotation: {
          annotations: this.getAnnotation(this.label),
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
        datasets: this.dataSet_month,
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
          mode: "index",
          intersect: false,
        },
        annotation: {
          annotations: this.getAnnotation(this.label),
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
        datasets: this.dataSet_year,
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
          mode: "index",
          intersect: false,
        },
        annotation: {
          annotations: this.getAnnotation(this.label),
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
                  'month': 'MM/YYYY'
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
