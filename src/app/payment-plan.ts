export interface PaymentPlan {
  mortgageAmount: number;
  interestRate: number;
  amortizationPeriodYear: number;
  amortizationPeriodMonth: number;
  paymentFrequence: PaymentFrequenceType;
  termInYear: number;
  prePaymentAmount: number;
}

export enum PaymentFrequenceType {
  ACCELERATED_WEEKLY,
  WEEKLY,
  ACCELERATED_BIWEEKLY,
  BIWEEKLY,
  SEMI_MONTHLY,
  MONTHLY,
}
