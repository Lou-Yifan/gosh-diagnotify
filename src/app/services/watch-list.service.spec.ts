import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { WatchListService } from './watch-list.service';

describe('WatchListService', () => {
  let service: WatchListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WatchListService, NativeStorage]
    });
    service = TestBed.inject(WatchListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
