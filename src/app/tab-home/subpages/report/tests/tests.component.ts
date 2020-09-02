import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss'],
})
export class TestsComponent implements OnInit {
  @Input() tests: any;

  constructor() { }

  ngOnInit() {}

}
