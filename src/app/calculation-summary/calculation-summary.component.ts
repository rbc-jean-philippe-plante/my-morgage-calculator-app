import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CalculationResultField } from '../service/calculation-result';
import { PaymentPlan } from '../payment-plan';

@Component({
  selector: 'app-calculation-summary',
  templateUrl: './calculation-summary.component.html',
  styleUrls: ['./calculation-summary.component.css'],
})
export class CalculationSummaryComponent implements OnInit, OnChanges {
  @Input() amortization: CalculationResultField;
  @Input() term: CalculationResultField;
  @Input() paymentPlan: PaymentPlan;

  tableData: TableElement[] = [];
  displayedColumns: string[] = ['category', 'term', 'amortization'];

  constructor() {}
  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    this.updateData();
  }

  ngOnInit(): void {
    this.updateData();
  }

  private updateData() {
    this.tableData = [];
    this.tableData.push({
      category: 'numberOfPayment',
      formatting: 'string',
      term: this.term.numberOfPayment,
      amortization: this.amortization.numberOfPayment,
    });
    this.tableData.push({
      category: 'mortgagePayment',
      formatting: 'cashAmount',
      term: this.term.mortgagePayment,
      amortization: this.amortization.mortgagePayment,
    });
    this.tableData.push({
      category: 'prePayment',
      formatting: 'cashAmount',
      term: this.term.prePayment,
      amortization: this.amortization.prePayment,
    });
    this.tableData.push({
      category: 'principalsPayment',
      formatting: 'cashAmount',
      term: this.term.principalsPayment,
      amortization: this.amortization.principalsPayment,
    });
    this.tableData.push({
      category: 'interestPayment',
      formatting: 'cashAmount',
      term: this.term.interestPayment,
      amortization: this.amortization.interestPayment,
    });
    this.tableData.push({
      category: 'totalCost',
      formatting: 'cashAmount',
      term: this.term.totalCost,
      amortization: this.amortization.totalCost,
    });
  }
}

export interface TableElement {
  category: string;
  term: number;
  amortization: number;
  formatting: string;
}
