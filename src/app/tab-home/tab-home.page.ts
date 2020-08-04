import { Component } from '@angular/core';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab-home.page.html',
  styleUrls: ['tab-home.page.scss']
})
export class HomePage {
  patients;
  imgUrl = 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2429260349,2150036447&fm=26&gp=0.jpg';

  constructor(public patientService: PatientService) {}

  ngOnInit(){
    this.InitializeData();
  }

  InitializeData(){
    this.patientService.getPatients().then(data =>{
      this.patients = data;
      //console.log(data);
    })
  }
 }
