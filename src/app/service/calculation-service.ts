import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { CalculationResult } from './calculation-result';
import { PaymentPlan, PaymentFrequenceType } from '../payment-plan';
import { MatDividerModule } from '@angular/material/divider';

/**
M = P[r(1+r)^n/((1+r)^n)-1)]

M = the total monthly mortgage payment.
P = the principal loan amount.
r = your monthly interest rate. Lenders provide you an annual rate so you’ll need to divide that figure by 12 (the number of months in a year) to get the monthly rate. If your interest rate is 5%, your monthly rate would be 0.004167 (0.05/12=0.004167)
n = number of payments over the loan’s lifetime. Multiply the number of years in your loan term by 12 (the number of months in a year) to get the number of payments for your loan. For example, a 30-year fixed mortgage would have 360 payments (30x12=360)
 */
@Injectable({
  providedIn: 'root',
})
export class CalculationService {
  constructor() {}

  public calculate(paymentPlan: PaymentPlan): CalculationResult {
    let numberOfYearsForTerm = paymentPlan.termInYear;
    let n = this.frequenceOfPayment(paymentPlan);
    let p = paymentPlan.mortgageAmount - paymentPlan.prePaymentAmount;
    let r = paymentPlan.interestRate / n / 100;
    let t =
      (paymentPlan.amortizationPeriodYear +
        paymentPlan.amortizationPeriodMonth / 12) *
      n;

    let mortgagePayment = this.calculateMortgagePayment(r, t, p);
    let prePayment = paymentPlan.prePaymentAmount;

    let numberOfPayment = n * numberOfYearsForTerm;

    let mortgagePaymentInterest = this.calulatePaymentInterest(
      p,
      t,
      mortgagePayment
    );

    let interestPaymentTerm = numberOfPayment * mortgagePaymentInterest;
    let principalsPaymentTerm =
      numberOfPayment * (mortgagePayment - mortgagePaymentInterest);
    let totalCostTerm = mortgagePayment * numberOfPayment;

    let interestPaymentAmortization = t * mortgagePaymentInterest;
    let principalsPaymentAmortization =
      t * (mortgagePayment - mortgagePaymentInterest);
    let totalCostAmortization = mortgagePayment * t;

    return {
      term: {
        numberOfPayment,
        mortgagePayment,
        prePayment,
        interestPayment: interestPaymentTerm,
        principalsPayment: principalsPaymentTerm,
        totalCost: totalCostTerm,
      },
      amortization: {
        numberOfPayment: t,
        mortgagePayment,
        prePayment,
        interestPayment: interestPaymentAmortization,
        principalsPayment: principalsPaymentAmortization,
        totalCost: totalCostAmortization,
      },
    };
  }

  private calculateMortgagePayment(r: number, t: number, p: number) {
    let s = r * Math.pow(1 + r, t);
    let d = Math.pow(1 + r, t) - 1;
    let payment = p * (s / d);
    return payment;
  }

  private calulatePaymentInterest(
    principal: number,
    numberOfPayment: number,
    mortgagePayment: number
  ): number {
    return mortgagePayment - principal / numberOfPayment;
  }

  private frequenceOfPayment(paymentPlan: PaymentPlan) {
    let frequence: number = 12;
    switch (paymentPlan.paymentFrequence) {
      case PaymentFrequenceType.ACCELERATED_BIWEEKLY:
        frequence = 365 / 26;
        break;
      case PaymentFrequenceType.ACCELERATED_WEEKLY:
        frequence = 365 / 52;
        break;
      case PaymentFrequenceType.BIWEEKLY:
        frequence = 26;
        break;
      case PaymentFrequenceType.MONTHLY:
        frequence = 12;
        break;
      case PaymentFrequenceType.SEMI_MONTHLY:
        frequence = 24;
        break;
      case PaymentFrequenceType.WEEKLY:
        frequence = 52;
        break;
    }
    return frequence;
  }
}
