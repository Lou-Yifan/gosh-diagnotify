import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CardColorPage } from './card-color.page';

describe('CardColorPage', () => {
  let component: CardColorPage;
  let fixture: ComponentFixture<CardColorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardColorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CardColorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
