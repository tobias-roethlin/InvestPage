import { TestBed } from '@angular/core/testing';

import { DcfServiceService } from './dcf-service.service';

describe('DcfServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DcfServiceService = TestBed.get(DcfServiceService);
    expect(service).toBeTruthy();
  });
});
