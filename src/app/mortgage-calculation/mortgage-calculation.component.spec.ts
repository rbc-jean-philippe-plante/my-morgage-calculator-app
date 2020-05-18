import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MortgageCalculationComponent } from './mortgage-calculation.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PaymentPlanComponent } from '../payment-plan/payment-plan.component';
import { CalculationSummaryComponent } from '../calculation-summary/calculation-summary.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

describe('MortgageCalculationComponent', () => {
  let component: MortgageCalculationComponent;
  let fixture: ComponentFixture<MortgageCalculationComponent>;

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
    fixture = TestBed.createComponent(MortgageCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
