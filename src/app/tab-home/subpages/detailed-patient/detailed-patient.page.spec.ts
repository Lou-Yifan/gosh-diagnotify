import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailedPatientPage } from './detailed-patient.page';

describe('DetailedPatientPage', () => {
  let component: DetailedPatientPage;
  let fixture: ComponentFixture<DetailedPatientPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedPatientPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailedPatientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
