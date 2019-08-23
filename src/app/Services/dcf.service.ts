import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, tap, concatMap, flatMap, filter, delay, retry, catchError } from 'rxjs/operators';

import { DCF } from '../DataObjects/DCF';
import { StockSymbol } from '../DataObjects/StockSymbol';

@Injectable({
  providedIn: 'root'
})
export class DcfService {

  private allSymbolesUrl = 'https://financialmodelingprep.com/api/stock/list/all?datatype=json';

  private DCFUrl = 'https://financialmodelingprep.com/api/v3/company/discounted-cash-flow/';
  private JsonUrlEnding = '?datatype=json';

  constructor(private http: HttpClient) {
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
            ),
            ),
          tap(x => x),
          catchError(error => {
            console.log(error);
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
         filter(x => x.DCF < x['Stock Price'] )
      );

      return result;
    }
}
