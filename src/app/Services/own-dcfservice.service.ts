import { Injectable } from '@angular/core';
import { curry, __ } from 'ramda';

@Injectable({
  providedIn: 'root'
})
export class OwnDCFService {

  constructor() { }

    // ***************** Long term groth rate ****************** => io

    investRatio = (InvestingCashFlow: number, DepreciationAndAmortization: number, NetCashFlow: number, EBIT: number, taxRate: number) =>
    (InvestingCashFlow - DepreciationAndAmortization + NetCashFlow) / (EBIT * (1 - taxRate))

    investRatio2 = (EBIT: number, incomeTaxExpenses: number) =>
    curry(this.investRatio)(__, __ , __ , EBIT, this.TaxRate(EBIT, incomeTaxExpenses))

    totalCapitalReturn = (EBIT: number, taxRate: number, TotalAssetsPrevious: number,
                          TotalLiabilitiesPrevious: number, TotalCashPrevious: number) =>
    (EBIT * (1 - taxRate)) / ( TotalLiabilitiesPrevious + TotalAssetsPrevious - TotalCashPrevious )

    totalCapitalReturn2 = (EBIT: number, incomeTaxExpenses: number) => curry(this.totalCapitalReturn)(EBIT,
      this.TaxRate(EBIT, incomeTaxExpenses), __, __, __)

    longTermGrowthRateFCF = (EBIT: number, incomeTaxExpenses: number, InvestingCashFlow: number,
      DepreciationAndAmortization: number, NetCashFlow: number, TotalAssetsPrevious: number,
      TotalLiabilitiesPrevious: number, TotalCashPrevious: number) =>
    this.investRatio2(EBIT, incomeTaxExpenses)(InvestingCashFlow, DepreciationAndAmortization, NetCashFlow)
    * this.totalCapitalReturn2(EBIT, incomeTaxExpenses)(TotalAssetsPrevious, TotalLiabilitiesPrevious, TotalCashPrevious)

    // ***************** WACC ****************** => io

    // beta
    BetaAjusted = (betaStock: number) => 0.333 + 0.667 * betaStock;

    // taxrate
    TaxRate = (EBIT: number, incomeTaxExpenses: number) => incomeTaxExpenses / EBIT;

    // expected return
    ExpectedReturn = (riskfeeRate: number, expectedMarketReturn: number, betaAjusted: number) =>
      riskfeeRate + (expectedMarketReturn - riskfeeRate) * betaAjusted

    ExpectedReturn2 = (betaStock: number) => curry(this.ExpectedReturn)(__, __, this.BetaAjusted(betaStock));

    // Expected costs of debts
    // Cost of Debt = Interest Expense (1 – Tax Rate)
    ExpectedDebtCost = (intrestExpense: number, totalDebt: number) => (intrestExpense) / totalDebt;

    // debt ratio
    debtRatio = (totalDebt: number, marktCap: number) => totalDebt / (totalDebt + marktCap);

    // quity ratio
    equityRatio = (totalDebt: number, marktCap: number) => marktCap / (totalDebt + marktCap);

    // WACC
    WACC = (
      debtRatio: number,
      equityRatio: number,
      taxrate: number,
      expectedReturn: number,
      expectedDebtCost: number) =>
      debtRatio * expectedDebtCost * (1 - taxrate) + equityRatio * expectedReturn

    WACC2 = (
      betaStock: number,
      riskfeeRate: number,
      expectedMarketRetun: number,
      EBIT: number,
      incomeTaxExpenses: number,
      intrestExpense: number,
      totalDebt: number,
      marktCap: number) =>
      this.WACC(
        this.debtRatio(totalDebt, marktCap),
        this.equityRatio(totalDebt, marktCap),
        this.TaxRate(EBIT, incomeTaxExpenses),
        this.ExpectedReturn2(betaStock)(riskfeeRate, expectedMarketRetun),
        this.ExpectedDebtCost(intrestExpense, totalDebt))


    // ***************** intrinsic value ******************

    // termin
    TerminalValue = (freeCashFlow: number, longTermGrothRate: number, WACC: number) =>
    (freeCashFlow * (1 + longTermGrothRate)) / (WACC - longTermGrothRate)

    TerminalValue2 = (
      freeCashFlow: number,
      EBIT: number,
      incomeTaxExpenses: number,
      InvestingCashFlow: number,
      DepreciationAndAmortization: number,
      NetCashFlow: number,
      TotalAssetsPrevious: number,
      TotalLiabilitiesPrevious: number,
      TotalCashPrevious: number,
      betaStock: number,
      riskfeeRate: number,
      expectedMarketReturn: number,
      intrestExpense: number,
      totalDebt: number,
      marktCap: number) =>
      this.TerminalValue(
        freeCashFlow,
        this.longTermGrowthRateFCF(EBIT, incomeTaxExpenses, InvestingCashFlow, DepreciationAndAmortization, NetCashFlow,
          TotalAssetsPrevious, TotalLiabilitiesPrevious, TotalCashPrevious),
        this.WACC2(betaStock, riskfeeRate, expectedMarketReturn,
          EBIT, incomeTaxExpenses, intrestExpense, totalDebt, marktCap))

    // IntrinsicValue
    IntrinsicValue = (
      Terminalvalue: number,
      TotalDebt: number,
      Cash: number,
      NumberOfShares: number) =>
      (Terminalvalue - TotalDebt + Cash) / NumberOfShares

    IntrinsicValue2 = (freeCashFlow: number,
      EBIT: number,
      incomeTaxExpenses: number,
      InvestingCashFlow: number,
      DepreciationAndAmortization: number,
      NetCashFlow: number,
      TotalAssetsPrevious: number,
      TotalLiabilitiesPrevious: number,
      TotalCashPrevious: number,
      betaStock: number,
      riskfeeRate: number,
      expectedMarketReturn: number,
      intrestExpense: number,
      totalDebt: number,
      marktCap: number) => curry(this.IntrinsicValue)(this.TerminalValue2(freeCashFlow, EBIT, incomeTaxExpenses, InvestingCashFlow,
        DepreciationAndAmortization, NetCashFlow, TotalLiabilitiesPrevious, TotalAssetsPrevious, TotalCashPrevious,
        betaStock, riskfeeRate, expectedMarketReturn, intrestExpense, totalDebt, marktCap), __, __, __)

}

