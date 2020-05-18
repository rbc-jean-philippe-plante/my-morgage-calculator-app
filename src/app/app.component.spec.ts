import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MortgageCalculationComponent } from './mortgage-calculation/mortgage-calculation.component';
import { PaymentPlanComponent } from './payment-plan/payment-plan.component';
import { CalculationSummaryComponent } from './calculation-summary/calculation-summary.component';
import { AngularMaterialModule } from './angular-material.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  beforeEach(async(() => {
    // required for AOT compilation
    function HttpLoaderFactory(http: HttpClient) {
      return new TranslateHttpLoader(http);
    }

    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
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

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have 'en' as current language`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.currentLang).toEqual('en');
  });

  it('should render right link for switching language from "en" to "fr"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('a').textContent).toContain(
      'language.french'
    );

    app.useLanguage('fr');
    fixture.detectChanges();

    const newCompiled = fixture.nativeElement;
    expect(newCompiled.querySelector('a').textContent).toContain(
      'language.english'
    );
  });
});
