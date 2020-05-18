export class CalculationResult {
  term: CalculationResultField;
  amortization: CalculationResultField;
}

export class CalculationResultField {
  numberOfPayment: number;
  mortgagePayment: number;
  prePayment: number;
  principalsPayment: number;
  interestPayment: number;
  totalCost: number;
}
