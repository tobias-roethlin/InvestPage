  // ***************** long term growth rate ****************** => ok

  NOPAT = (operatingIncome: number, taxrate: number) => operatingIncome * (1 - taxrate);
  cNOPAT = (EBIT: number,  incomeTaxExpenses: number, operatingIncome: number) =>
  curry(this.NOPAT)(operatingIncome, this.TaxRate(EBIT, incomeTaxExpenses))

  // retention (selbstbehalt) rate, or ( 1 - payout ratio) => ok
  SustainableGrowthRate = (dividePerShare: number, earningsPerShare: number) => (1 - (dividePerShare / earningsPerShare)) * 0.4936;

  SustainableGrowthRateFormula = (retentionRatio: number, ROE: number) => retentionRatio * ROE;

    // invested capital => ok
    investedCapital = (
      longTermDebt: number, shortTermDebtAndLeaseCapital: number,
      minorityInerest: number, totalStackholdersEquity: number) =>
      longTermDebt + shortTermDebtAndLeaseCapital + minorityInerest + totalStackholdersEquity

    // Return on the invested capital (ROIC) => ok
    ROIC = (NOPAT: number, invstedCapital: number) => NOPAT / invstedCapital;

    ROIC2 = (
      EBIT: number,
      incomeTaxExpenses: number,
      operatingIncome: number,
      longTermDebt: number,
      shortTermDebtAndLeaseCapital: number,
      minorityInerest: number,
      totalStackholdersEquity: number) =>
      curry(this.ROIC)(this.cNOPAT(EBIT, incomeTaxExpenses, operatingIncome), this.investedCapital(longTermDebt,
        shortTermDebtAndLeaseCapital, minorityInerest, totalStackholdersEquity))

    // long term growth rate
    longTermGrowthRate = (InvestRatioFullCapital: number, TotalCapitalReturnAdjusted: number) =>
    InvestRatioFullCapital * TotalCapitalReturnAdjusted

    longTermGrowthRate2 = (
      dividePerShare: number,
      earningsPerShare: number,
      EBIT: number,
      incomeTaxExpenses: number,
      operatingIncome: number,
      longTermDebt: number,
      shortTermDebtAndLeaseCapital: number,
      minorityInerest: number,
      totalStackholdersEquity: number
    ) =>
      this.longTermGrowthRate(
        this.SustainableGrowthRate(dividePerShare, earningsPerShare),
        this.ROIC2(EBIT, incomeTaxExpenses, operatingIncome, longTermDebt,
          shortTermDebtAndLeaseCapital, minorityInerest, totalStackholdersEquity))