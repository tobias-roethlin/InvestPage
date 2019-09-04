import { Component, OnInit, Pipe } from '@angular/core';
import { DcfService } from '../Services/dcf.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dcfoverview',
  templateUrl: './dcfoverview.component.html',
  styleUrls: ['./dcfoverview.component.css']
})
export class DCFOverviewComponent implements OnInit {
  title = 'DCF Overview';

  Dcf: string[] = [];
  subscription: Subscription;

  constructor(private dcfService: DcfService) {
  }

  ngOnInit() {
  }

  onClickMe(): void {
    this.subscription = this.dcfService.GetUnderValuedDCFValues()
    .subscribe(x => this.Dcf.push('symbol: ' + x.symbol + 'stock price' + x['Stock Price'] + 'DCF' + x.DCF),
    error => console.log(error));
  }

  ngOnDestory() {
    this.subscription.unsubscribe();
  }
}
