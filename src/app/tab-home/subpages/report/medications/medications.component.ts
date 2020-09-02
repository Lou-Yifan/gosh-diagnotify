import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-medications',
  templateUrl: './medications.component.html',
  styleUrls: ['./medications.component.scss'],
})
export class MedicationsComponent implements OnInit {
  @Input() medications: any;
  @Input() datetime: any;

  constructor() { }

  ngOnInit() {
  }

}
