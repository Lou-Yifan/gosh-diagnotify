import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FontSizePage } from './font-size.page';

describe('FontSizePage', () => {
  let component: FontSizePage;
  let fixture: ComponentFixture<FontSizePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FontSizePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FontSizePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
