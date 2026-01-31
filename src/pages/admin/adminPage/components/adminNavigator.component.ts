// components/header.component.ts
import { type Page, type Locator, expect } from '@playwright/test';
import { stepClick } from '../../../../utils/UIHelper'; 


export class AdminNavigatorComponent {
  readonly page: Page;
  readonly userManagementDropDown: Locator;
  readonly userItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userManagementDropDown = page.getByRole('listitem').filter({ hasText: 'User Management' });
    this.userItem = page.getByRole('listitem').filter({ hasText: /^Users$/ });

  }

  async openUserManagement() {
    await stepClick(this.userManagementDropDown, 'User Dropdown')
    await stepClick(this.userItem, "User")
  }
}