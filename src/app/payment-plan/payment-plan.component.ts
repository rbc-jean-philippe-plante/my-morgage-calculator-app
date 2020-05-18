import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { PaymentPlan, PaymentFrequenceType } from '../payment-plan';
import { CalculationService } from '../service/calculation-service';
import { CalculationResult } from '../service/calculation-result';

@Component({
  selector: 'app-payment-plan',
  templateUrl: './payment-plan.component.html',
  styleUrls: ['./payment-plan.component.css'],
})
export class PaymentPlanComponent implements OnInit, OnChanges {
  defaultPaymentPlan: PaymentPlan = {
    mortgageAmount: 100000,
    interestRate: 5,
    amortizationPeriodYear: 25,
    amortizationPeriodMonth: 0,
    paymentFrequence: PaymentFrequenceType.MONTHLY,
    termInYear: 5,
    prePaymentAmount: 0,
  };

  @Input() paymentPlan: PaymentPlan = this.defaultPaymentPlan;

  @Input() calculationResult: CalculationResult;

  termsList: number[];
  amortizationYearsList: number[];
  amortizationMonthsList: number[];

  constructor(private calculationService: CalculationService) {
    this.termsList = Array(10)
      .fill(1)
      .map((x, i) => i + 1);
    this.amortizationYearsList = Array(30)
      .fill(1)
      .map((x, i) => i + 1);
    this.amortizationMonthsList = Array(12)
      .fill(1)
      .map((x, i) => i + 1);
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.calculate();
  }

  ngOnInit(): void {
    this.calculate();
  }

  public calculate() {
    this.calculationResult = this.calculationService.calculate(
      this.paymentPlan
    );
  }
}
