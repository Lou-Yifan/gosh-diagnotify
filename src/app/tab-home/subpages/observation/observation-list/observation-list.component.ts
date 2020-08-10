import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-observation-list',
  templateUrl: './observation-list.component.html',
  styleUrls: ['./observation-list.component.scss'],
})
export class ObservationListComponent implements OnInit {

  @Input() observations: any;
  @Input() observedItems: any[] = [];

  constructor() { }

  ngOnInit() {}

}
