import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public currentLang: string;

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
    this.currentLang = 'en';
  }

  public useLanguage(language: string) {
    this.translate.use(language);
    this.currentLang = this.translate.currentLang;
  }
}
