import { TestBed } from '@angular/core/testing';

import { MyItemsService } from './my-items.service';

describe('MyItemsService', () => {
  let service: MyItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
