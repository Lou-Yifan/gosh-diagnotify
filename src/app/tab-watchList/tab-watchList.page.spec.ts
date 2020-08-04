import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { WatchListPage } from './tab-watchList.page';

describe('WatchListPage', () => {
  let component: WatchListPage;
  let fixture: ComponentFixture<WatchListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WatchListPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(WatchListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
