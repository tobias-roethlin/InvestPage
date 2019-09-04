// import { TestBed } from '@angular/core/testing';

// import { OwnDCFService } from './own-dcfservice.service';
// import { HttpClientTestingModule } from '@angular/common/http/testing';

// describe('OwnDCFService', () => {

//   beforeEach(() => {TestBed.configureTestingModule(
//     {
//     imports: [HttpClientTestingModule]
//     });
//   });

//   it('should be created', () => {
//     const service: OwnDCFService = TestBed.get(OwnDCFService);
//     expect(service).toBeTruthy();
//   });

//   it('sustainable growth rate 2018-09-29', () => {
//     const service: OwnDCFService = TestBed.get(OwnDCFService);

//     const dividePerShare = 2.72;
//     const earningsPerShare = 11.91;

//     const sustainableGrowthRate = service.SustainableGrowthRate(dividePerShare, earningsPerShare)

//     expect(sustainableGrowthRate).toBe(0.3808718723761545);
//     // ychart => 37.99%
//   });

//   it('OK -- return on invested capital (ROIC) Apple 2018-09-29', () => {
//     const service: OwnDCFService = TestBed.get(OwnDCFService);

//     const EBIT = 72903000000.0;
//     const operatingIncome = 70898000000.0;
//     const incomeTaxExpenses = 13372000000.0;
//     const longTermDebt = 93735000000.0;
//     const shortTermDebtAndLeaseCapital = 20748000000.0;
//     const minorityInerest = 0;
//     const totalStackholdersEquity = 107147000000.0;

//     const ROIC =
//     service.ROIC2(EBIT, incomeTaxExpenses, operatingIncome, longTermDebt, shortTermDebtAndLeaseCapital,
//       minorityInerest, totalStackholdersEquity);

//     expect(ROIC).toBe(0.26121806940916253);

//     // fokus guru 35%
//     // uncle stock 24.39%
//     // 25.36% yCharts
//     // api 21.7%
//   });


//   it('OK -- Net operating profit after tax (NOPAT), Consolidated income Apple 2018-09-29', () => {
//     const service: OwnDCFService = TestBed.get(OwnDCFService);

//     const temp = 70898000000.0 * (1 - 0.18342180705869443);
//     expect(temp).toBe(57893760723.15269); // equal consolidated income

//     const temp2 = 70898000000.0 * (1 - 0.26);
//     expect(temp2).toBe(52464520000); // equal consolidated income

//     // focus guru 57895.3068
//     // ycharts => 57895.3068
//     // 52.20B uncle stock with 26% tax
//   });

//   it('OK -- Invested Capital Apple 2018-09-29', () => {
//     const service: OwnDCFService = TestBed.get(OwnDCFService);

//     const longTermDebt = 93735000000.0;
//     const shortTermDebtAndLeaseCapital = 20748000000.0;
//     const minorityInerest = 0;
//     const totalStackholdersEquity = 107147000000.0;

//     const investedCapital =
//       service.investedCapital(longTermDebt, shortTermDebtAndLeaseCapital, minorityInerest,
//         totalStackholdersEquity);

//     expect(investedCapital).toBe(221630000000);

//     // =	Long-Term Debt & Capital Lease Obligation	+	Short-Term Debt & Capital Lease Obligation	
//     // +	Minority Interest	+	Total Stockholders Equity	-	Cash
//     // =	93735	+	20748	+	0	+	107147	-	66301
//     // =	155329

//     // focus guru           155329
//     // "Invested Capital" : 338366 000000.0"
//     // uncle stock          206220 000000
//       // ycharts         221.63B
//   });

// });
