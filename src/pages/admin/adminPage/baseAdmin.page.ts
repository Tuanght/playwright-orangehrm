import { BasePage } from './../../base.page';
import { Page } from "@playwright/test";
import { AdminNavigatorComponent } from "./components/adminNavigator.component";

export class BaseAdminPage extends BasePage{
  readonly adminNavigator: AdminNavigatorComponent
  constructor(page: Page) {
    super(page)
    this.adminNavigator = new AdminNavigatorComponent(page)
  }
}