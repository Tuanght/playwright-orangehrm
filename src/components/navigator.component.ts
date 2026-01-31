import { type Page, type Locator, expect } from '@playwright/test';
import { stepClick, stepDbClick, stepExpectToVisible } from '../utils/UIHelper'


export class NavigatorComponent {
  readonly page: Page;

  readonly adminTab: Locator;
  readonly pimTab: Locator;
  readonly leaveTab: Locator;

  constructor(page: Page) {
    this.page = page;
    
    this.adminTab = page.getByRole('link', { name: 'Admin' })
    this.pimTab = page.getByRole('link', { name: 'PIM' })
    this.leaveTab = page.getByRole('link', { name: 'Leave', exact: true })
    
  }

 
  async openPIMPage() {
    await stepExpectToVisible(this.pimTab, 'PIM Tab')
    await stepDbClick(this.pimTab, "PIM")
  }

  async openAdminPage() {
    await stepExpectToVisible(this.adminTab, 'Admin Tab')
    await stepClick(this.adminTab, "Admin")
  }

  async openLeavePage() {
    await stepExpectToVisible(this.leaveTab, 'Leave Tab')
    await stepClick(this.leaveTab, "Leave")
  }
}