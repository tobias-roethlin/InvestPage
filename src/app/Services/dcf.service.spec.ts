import { TestBed } from '@angular/core/testing';

import { DcfService } from './dcf.service';

describe('DcfServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DcfService = TestBed.get(DcfService);
    expect(service).toBeTruthy();
  });
});
