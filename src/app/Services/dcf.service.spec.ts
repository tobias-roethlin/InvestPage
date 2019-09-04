import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DcfService } from 'src/app/Services/dcf.service';
import { OwnDCFService } from '../Services/own-dcfservice.service';

describe('DcfService', () => {

  let dcfService: DcfService;
  let ownDCFServiceSpy: jasmine.SpyObj<OwnDCFService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('OwnDCFService', ['BetaAjusted']);

    TestBed.configureTestingModule(
    {
        providers: [OwnDCFService, {provide: OwnDCFService, useValue: spy}],
        imports: [HttpClientTestingModule]
    });

      dcfService = TestBed.get(DcfService);
      ownDCFServiceSpy= TestBed.get(OwnDCFService);
    });

  it('should be created', () => {
    const stubValue = 42;
    ownDCFServiceSpy.BetaAjusted.and.returnValue(stubValue);

    const tmep = dcfService.GetUnderValuedDCFValues();

    //expect(this.dcfService).toBeTruthy();
  });
});
