import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, tap, concatMap, flatMap, filter, delay, retry, catchError } from 'rxjs/operators';

import { DCF } from '../DataObjects/DCF';
import { StockSymbol } from '../DataObjects/StockSymbol';
import { OwnDCFService } from '../Services/own-dcfservice.service';
import { IncomeStatements } from 'src/app/DataObjects/IncomeStatements';
import { CashFlowStates } from 'src/app/DataObjects/CashFlowStates';

@Injectable({
  providedIn: 'root'
})
export class DcfService {

  private allSymbolesUrl = 'https://financialmodelingprep.com/api/stock/list/all?datatype=json';

  private DCFUrl = 'https://financialmodelingprep.com/api/v3/company/discounted-cash-flow/';
  private JsonUrlEnding = '?datatype=json';

  constructor(private http: HttpClient, private OwnDCFService: OwnDCFService) {
    }

    public getAllDCFValues(): Observable<DCF> {

      const result = this.http.get<StockSymbol[]>(this.allSymbolesUrl)
        .pipe(
          map(x => x.sort((a, b) => {
            if ( a.Ticker < b.Ticker) { return -1; }
            if ( a.Ticker > b.Ticker) { return 1; }
            return 0;
          })),
          flatMap(x => x),
          map(x => this.DCFUrl + x.Ticker),
          concatMap(x => this.http.get<DCF>(x).pipe(
              delay(200),
              retry(3),
              catchError(error => {
                console.log('inner error catch raised' + JSON.stringify(error));
                return of(new DCF());
              })
              ),
            ),
          tap(x => console.log('symbol loaded' + x.symbol)),
          catchError(error => {
            console.log('outer error catch raised' + error);
            return of(new DCF()) ;
          }),
        );

      return result;
    }

    public GetUnderValuedDCFValues(): Observable<DCF> {

      const allDCFValues = this.getAllDCFValues();

      const result = allDCFValues.pipe(
         tap(x => console.log(x.symbol)),
         filter(x => x.DCF > 0),
         filter(x => this.round(x.DCF) < this.round(x['Stock Price']))
      );

      return result;
    }

    private round(num: number) {
      const str = num.toFixed(1);
      return Number(str);
    }

    private urlStats = 'https://financialmodelingprep.com/api/v3/financials/income-statement/AAPL';
    private urlCashFlow = 'https://financialmodelingprep.com/api/v3/financials/cash-flow-statement/AAPL';

    public getDCF(): Observable<number> {

      const cashFlow = this.http.get<CashFlowStates>(this.urlCashFlow).pipe(
        map(s => {
          const latestCashFlowData = s['financials'][0];
          const freeCashFlow = latestCashFlowData['Free Cash Flow'];
        })
      )

      const result = this.http.get<IncomeStatements>(this.urlStats).pipe(
          map(s => s.financials[0]),
          map(s => {
              // general params
              const riskfeeRate = 10; // 10-year U.S. Treasury bond yield
              const expectedMarketReturn = 10;
              const taxrate = 10;

              // balance sheet
              const EBIT = s.EBIT; // io
              const FreeCashFlow = 10; // io
              const CapitalExpenditure = 10; // io
              const DeprecationAndAmortisation = 10; // io
              const changeInWorkingCapital = 10; // io
              const eigenKapital = 10;
              const fremdKapital = 10;
              const nichtBetribsnotwendigeZahlungsmittel = 10;
              const betaStock = 10;
              const kreditRisikoPrämie = 10;
              const nichtbetriebsnotwendingsVermögen = 10;
              const zinstragendesFremdKapital = 10;
              const anteilAndererGesellschafen = 10;
              const NumberOfStocks = 10;

              // return this.OwnDCFService.IntrinsicValuePerStock2(
              //   EBIT, taxrate, FreeCashFlow, CapitalExpenditure, DeprecationAndAmortisation, changeInWorkingCapital, eigenKapital,
              //   fremdKapital, nichtBetribsnotwendigeZahlungsmittel, betaStock, riskfeeRate, expectedMarketReturn, kreditRisikoPrämie,
              //     nichtbetriebsnotwendingsVermögen, zinstragendesFremdKapital, anteilAndererGesellschafen, NumberOfStocks );

              return 10;
          })
      );

      return result;
    }
}
