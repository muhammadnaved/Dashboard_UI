import { TestBed } from '@angular/core/testing';

import { CustserviceService } from './custservice.service';

describe('CustserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustserviceService = TestBed.get(CustserviceService);
    expect(service).toBeTruthy();
  });
});
