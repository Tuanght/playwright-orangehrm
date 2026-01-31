import { type Page, type Locator } from '@playwright/test';
import { HeaderComponent } from '../components/header.component';
import { NavigatorComponent } from '../components/navigator.component';

type LocatorMap = Record<string, string | ((page: Page) => Locator)>;

export class BasePage {
  readonly page: Page;
  readonly header: HeaderComponent;
  readonly navigator: NavigatorComponent;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderComponent(page);
    this.navigator = new NavigatorComponent(page);

  }

  protected createLocatorGetter<T extends LocatorMap>(locatorMap: T) {
    return (name: keyof T): Locator => {
      const def = locatorMap[name];
      if (typeof def === 'function') {
        return def(this.page);
      }
      return this.page.locator(def);
    };

  }
}
