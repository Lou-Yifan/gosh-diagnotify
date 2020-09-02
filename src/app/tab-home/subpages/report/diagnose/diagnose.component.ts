import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-diagnose',
  templateUrl: './diagnose.component.html',
  styleUrls: ['./diagnose.component.scss'],
})
export class DiagnoseComponent implements OnInit {
  @Input() diagnoses: any;
  @Input() datetime: any;

  constructor() { }

  ngOnInit() {
  }

}
