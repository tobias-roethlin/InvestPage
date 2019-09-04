import { TestBed } from '@angular/core/testing';

import { OwnDCFService } from './own-dcfservice.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('OwnDCFService', () => {

  beforeEach(() => {TestBed.configureTestingModule(
    {
    imports: [HttpClientTestingModule]
    });
  });

  it('should be created', () => {
    const service: OwnDCFService = TestBed.get(OwnDCFService);
    expect(service).toBeTruthy();
  });

  it('Aktienbewertung book example page 282 and 283', () => {
    const service: OwnDCFService = TestBed.get(OwnDCFService);

    // general params
    const riskfeeRate = 0.01; // io
    const expectedMarketRetun = 0.056; // io
    const taxrate = 0.18; // io

    // balance sheet
    const EBIT = 462300000; // io
    const FreeCashFlow = 346090000; // io
    const CapitalExpenditure = 97100000; // io
    const DeprecationAndAmortisation = 80100000; // io
    const investmentsInWokringCapital = 16000000; // io
    const eigenKapital = 1419500000; // io
    const fremdKapital = 703200000; // io
    const nichtBetribsnotwendigeZahlungsmittel = 586600000; // io
    const betaStock = 0.91; // io
    const kreditRisikoPrämie = 0.013; // io
    const nichtbetriebsnotwendingsVermögen = 455000000; // io
    const zinstragendesFremdKapital = 220900000; // io
    const anteilAndererGesellschafen = 0; // io
    const NumberOfStocks = 38821000; // io

    // const dcf  = service.IntrinsicValuePerStock2(
    //   EBIT, taxrate, FreeCashFlow, CapitalExpenditure, DeprecationAndAmortisation, investmentsInWokringCapital, eigenKapital,
    //   fremdKapital, nichtBetribsnotwendigeZahlungsmittel, betaStock, riskfeeRate, expectedMarketRetun, kreditRisikoPrämie,
    //     nichtbetriebsnotwendingsVermögen, zinstragendesFremdKapital, anteilAndererGesellschafen, NumberOfStocks );

    //expect(dcf).toBe(314.9420268744349);
  });

  it('OK -- tax rate Apple 2018-09-29', () => {
    const service: OwnDCFService = TestBed.get(OwnDCFService);

    const EBIT = 72903000000.0;
    const IncomeTaxExpense = 13372000000.0;
    const taxRate = service.TaxRate(EBIT, IncomeTaxExpense);

    expect(taxRate).toBe(0.18342180705869443);

    // gurufocus 18.34%
    // unclestock 18.34%
    // ychart 18.34%
  });

  it('OK -- debt ratio Apple 2018-09-29', () => {
    const service: OwnDCFService = TestBed.get(OwnDCFService);

    const totalDebt = 114483000000.0;
    const marktCap = 1021072258890.0;
    const debtRatio = service.debtRatio(totalDebt, marktCap);

    expect(debtRatio).toBe(0.10081675823676481);

    // unclestock 10.42%
  });

  it('OK -- equity ratio Apple 2018-09-29', () => {
    const service: OwnDCFService = TestBed.get(OwnDCFService);

    const totalDebt = 114483000000.0;
    const marktCap = 1021072258890.0;
    const equityRatio = service.equityRatio(totalDebt, marktCap);

    expect(equityRatio).toBe(0.8991832417632352);

    // unclestock 89.58%
  });

  it('OK -- expected return Apple 2018-09-29', () => {
    const service: OwnDCFService = TestBed.get(OwnDCFService);

    const betaApple = 1.139593;
    const riskFreeRate = 0.01484; // uncelstock 2.49%
    const expectedMarktReturn = 0.06; // uncelstock 9%

    const expectedReturn = service.ExpectedReturn2(betaApple)(riskFreeRate, expectedMarktReturn);

    expect(expectedReturn).toBe(0.06420478125996001);
    // unclestock 10.37%
    // investopedia 6.25%
  });

  it('OK -- expected debt cost ratio Apple 2018-09-29', () => {
    const service: OwnDCFService = TestBed.get(OwnDCFService);

    const intrestExpense = 3240000000;
    const totalDebt = 114483000000.0;

    const expectedReturn = service.ExpectedDebtCost(intrestExpense, totalDebt);
    expect(expectedReturn).toBe(0.02830114514818794);
    // unclestock 4.07%
  });

  it('OK -- WACC Apple 2018-09-29', () => {
    const service: OwnDCFService = TestBed.get(OwnDCFService);

    const betaStock = 1.139593;
    const riskfeeRate = 0.01484;
    const expectedMarketReturn = 0.097;
    const EBIT = 72903000000.0;
    const IncomeTaxExpense = 13372000000.0;
    const intrestExpense = 3240000000;
    const totalDebt = 114483000000.0;
    const marktCap = 1021072258890.0;

    const wacc = service.WACC2(betaStock, riskfeeRate, expectedMarketReturn,
      EBIT, IncomeTaxExpense, intrestExpense, totalDebt, marktCap);
    expect(wacc).toBe(0.09642922879185611); // Unclestock 9.66%
  });

  it('OK -- WACC 2 Apple 2018-09-29', () => {
    const service: OwnDCFService = TestBed.get(OwnDCFService);

    const betaStock = 1.139593;
    const riskfeeRate = 0.0246;
    const expectedMarketRetun = 0.0796;
    const raxRate = 0.246;
    const constOfDebt = 0.05;
    const totalDebt = 92207;
    const marktCap = 965160.04;

    const wacc = service.WACC(
      service.debtRatio(totalDebt, marktCap),
      service.equityRatio(totalDebt, marktCap),
      raxRate,
      service.ExpectedReturn2(betaStock)(riskfeeRate, expectedMarketRetun),
      constOfDebt);

    expect(wacc).toBe(0.08062053639078497);
  });

  it('OK -- invest ratio Apple 2018-09-29', () => {
    const service: OwnDCFService = TestBed.get(OwnDCFService);

    const EBIT = 72903000000.0;
    const incomeTaxExpenses = 13372000000.0;
    const InvestingCashFlow = 16066000000.0;
    const DepreciationAndAmortization = 10903000000.0;
    const NetCashFlow = 5624000000.0;

    const investRatio = service.investRatio2(EBIT, incomeTaxExpenses)(InvestingCashFlow, DepreciationAndAmortization, NetCashFlow);

    expect(investRatio).toBe(0.18119971107490213);
  });

  it('OK -- total capital return Apple 2018-09-29', () => {
    const service: OwnDCFService = TestBed.get(OwnDCFService);

    const EBIT = 72903000000.0;
    const incomeTaxExpenses = 13372000000.0;
    const TotalLiabilieteisPrevious = 241272000000.0;
    const TotalAssetsPrevious = 375319000000.0;
    const TotalCashPrevious = 74181000000.0;

    const totalCapitalReturn = service.totalCapitalReturn2(EBIT, incomeTaxExpenses)
      (TotalLiabilieteisPrevious, TotalAssetsPrevious, TotalCashPrevious);

    expect(totalCapitalReturn).toBe(0.10975277004480008);
  });

  it('OK -- long term growth rate FCF Apple 2018-09-29', () => {
    const service: OwnDCFService = TestBed.get(OwnDCFService);

    const EBIT = 72903000000.0;
    const incomeTaxExpenses = 13372000000.0;
    const InvestingCashFlow = 16066000000.0;
    const DepreciationAndAmortization = 10903000000.0;
    const NetCashFlow = 5624000000.0;
    const TotalLiabilieteisPrevious = 241272000000.0;
    const TotalAssetsPrevious = 375319000000.0;
    const TotalCashPrevious = 74181000000.0;

    const longTermGrowthRate = service.longTermGrowthRateFCF(EBIT, incomeTaxExpenses, InvestingCashFlow, DepreciationAndAmortization,
      NetCashFlow, TotalLiabilieteisPrevious, TotalAssetsPrevious, TotalCashPrevious);

    expect(longTermGrowthRate).toBe(0.01988717022178795);
  });

  it('OK -- terminal value Apple 2018-09-29', () => {
    const service: OwnDCFService = TestBed.get(OwnDCFService);

    const freeCashFlow = 64121000000.0;

    const EBIT = 72903000000.0;
    const incomeTaxExpenses = 13372000000.0;
    const InvestingCashFlow = 16066000000.0;
    const DepreciationAndAmortization = 10903000000.0;
    const NetCashFlow = 5624000000.0;
    const TotalLiabilieteisPrevious = 241272000000.0;
    const TotalAssetsPrevious = 375319000000.0;
    const TotalCashPrevious = 74181000000.0;

    const betaStock = 1.139593;
    const riskfeeRate = 0.01484; // variable
    const expectedMarketReturn = 0.097; // variable
    const intrestExpense = 3240000000;
    const totalDebt = 114483000000.0;
    const marktCap = 1021072258890.0;

    const operativeCompanyValue = service.TerminalValue2(freeCashFlow, EBIT, incomeTaxExpenses, InvestingCashFlow, 
      DepreciationAndAmortization, NetCashFlow, TotalLiabilieteisPrevious, TotalAssetsPrevious, TotalCashPrevious, 
      betaStock, riskfeeRate, expectedMarketReturn, intrestExpense, totalDebt, marktCap);

    expect(operativeCompanyValue).toBe(854382367857.6172);

    // 4755000000 => number of stocks => Price 179.68 UDS per share
  });

  it('OK -- total capital return Apple 2018-09-29', () => {
    const service: OwnDCFService = TestBed.get(OwnDCFService);

    const Terminalvalue = 854382367857.6172;
    const TotalDebt = 114483000000.0;
    const Cash = 66301000000.0;
    const NumberOfShares = 4755000000;

    const equityPerShare = (Terminalvalue - TotalDebt + Cash) / NumberOfShares;

    expect(equityPerShare).toBe(169.5479217366177);
  });

  it('OK -- intrinsic value per share Apple 2018-09-29', () => {
    const service: OwnDCFService = TestBed.get(OwnDCFService);

    const freeCashFlow = 64121000000.0;

    const EBIT = 72903000000.0;
    const incomeTaxExpenses = 13372000000.0;
    const InvestingCashFlow = 16066000000.0;
    const DepreciationAndAmortization = 10903000000.0;
    const NetCashFlow = 5624000000.0;
    const TotalLiabilieteisPrevious = 241272000000.0;
    const TotalAssetsPrevious = 375319000000.0;
    const TotalCashPrevious = 74181000000.0;

    const betaStock = 1.139593;
    const riskfeeRate = 0.01484; // variable
    const expectedMarketReturn = 0.066 + riskfeeRate; // variable
    const intrestExpense = 3240000000;
    const totalDebt = 114483000000.0;
    const marktCap = 1021072258890.0;

    const TotalDebt = 114483000000.0;
    const Cash = 66301000000.0;
    const NumberOfShares = 4755000000;

    const operativeCompanyValue = service.IntrinsicValue2(freeCashFlow, EBIT, incomeTaxExpenses, InvestingCashFlow,
      DepreciationAndAmortization, NetCashFlow, TotalLiabilieteisPrevious, TotalAssetsPrevious, TotalCashPrevious,
      betaStock, riskfeeRate, expectedMarketReturn, intrestExpense, totalDebt, marktCap)(TotalDebt, Cash, NumberOfShares);

    expect(operativeCompanyValue).toBe(216.59842273948436);
  });
});
