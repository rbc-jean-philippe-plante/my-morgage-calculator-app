import { CalculationService } from './calculation-service';
import { PaymentPlan, PaymentFrequenceType } from '../payment-plan';
import { async } from '@angular/core/testing';

describe('PaymentPlanComponent', () => {
  let service: CalculationService;

  beforeEach(async(() => {
    service = new CalculationService();
  }));

  it('calculate term/armotization', () => {
    const paymentPlan: PaymentPlan = {
      mortgageAmount: 100000,
      interestRate: 5,
      amortizationPeriodYear: 25,
      amortizationPeriodMonth: 0,
      paymentFrequence: PaymentFrequenceType.MONTHLY,
      termInYear: 5,
      prePaymentAmount: 10000,
    };

    const results = service.calculate(paymentPlan);

    expect(results.term.interestPayment.toFixed(2)).toEqual('13567.86');
    expect(results.term.mortgagePayment.toFixed(2)).toEqual('526.13');
    expect(results.term.numberOfPayment).toEqual(60);
    expect(results.term.prePayment).toEqual(10000);
    expect(results.term.principalsPayment).toEqual(18000);
    expect(results.term.totalCost.toFixed(2)).toEqual('31567.86');

    expect(results.amortization.interestPayment.toFixed(2)).toEqual('67839.31');
    expect(results.amortization.mortgagePayment.toFixed(2)).toEqual('526.13');
    expect(results.amortization.numberOfPayment).toEqual(300);
    expect(results.amortization.prePayment).toEqual(10000);
    expect(results.amortization.principalsPayment).toEqual(90000);
    expect(results.amortization.totalCost.toFixed(2)).toEqual('157839.31');
  });
});
