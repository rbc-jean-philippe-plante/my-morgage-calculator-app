import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculationSummaryComponent } from './calculation-summary.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MortgageCalculationComponent } from '../mortgage-calculation/mortgage-calculation.component';
import { PaymentPlanComponent } from '../payment-plan/payment-plan.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

describe('CalculationSummaryComponent', () => {
  let component: CalculationSummaryComponent;
  let fixture: ComponentFixture<CalculationSummaryComponent>;

  beforeEach(async(() => {
    // required for AOT compilation
    function HttpLoaderFactory(http: HttpClient) {
      return new TranslateHttpLoader(http);
    }

    TestBed.configureTestingModule({
      declarations: [
        MortgageCalculationComponent,
        PaymentPlanComponent,
        CalculationSummaryComponent,
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        AngularMaterialModule,
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculationSummaryComponent);
    component = fixture.componentInstance;
    component.term = {
      numberOfPayment: 60,
      mortgagePayment: 581.6,
      prePayment: 0,
      interestPayment: 23403.8,
      principalsPayment: 11492.5,
      totalCost: 34896.3,
    };
    component.amortization = {
      numberOfPayment: 300,
      mortgagePayment: 581.6,
      prePayment: 0,
      interestPayment: 74481.5,
      principalsPayment: 100000,
      totalCost: 174481.5,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display term and autorization correctly', () => {
    const app = fixture.componentInstance;

    const compiled = fixture.nativeElement;
    const termColumns = compiled.querySelectorAll('td.mat-column-term');
    expect(termColumns[0].textContent).toContain('60');
    expect(termColumns[1].textContent).toContain('$581.60');
    expect(termColumns[2].textContent).toContain('$0.00');
    expect(termColumns[3].textContent).toContain('$11,492.50');
    expect(termColumns[4].textContent).toContain('$23,403.80');
    expect(termColumns[5].textContent).toContain('$34,896.30');

    const amoritzationColumns = compiled.querySelectorAll(
      'td.mat-column-amortization'
    );
    expect(amoritzationColumns[0].textContent).toContain('300');
    expect(amoritzationColumns[1].textContent).toContain('$581.60');
    expect(amoritzationColumns[2].textContent).toContain('$0.00');
    expect(amoritzationColumns[3].textContent).toContain('$100,000.00');
    expect(amoritzationColumns[4].textContent).toContain('$74,481.50');
    expect(amoritzationColumns[5].textContent).toContain('$174,481.50');
  });
});
