// components/header.component.ts
import { type Page, type Locator, expect } from '@playwright/test';
import { stepClick } from '../../../../utils/UIHelper'; 


export class LeaveNavigatorComponent {
  readonly page: Page;
  readonly applyLink: Locator;
  readonly myLeaveLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.applyLink = page.getByRole('link', { name: 'Apply' });
    this.myLeaveLink = page.getByRole('link', { name: 'My Leave' });
  }

  async openApplyLeave() {
    await stepClick(this.applyLink, 'Apply Navigator')
  }

  async openMyLeave() {
    await stepClick(this.myLeaveLink, 'My Leave Navigator')
  }
}