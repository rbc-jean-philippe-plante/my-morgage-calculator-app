import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getDefaultText(): Promise<string> {
    return element(by.tagName('h1')).getText() as Promise<string>;
  }
}
