// components/header.component.ts
import { type Page, type Locator, expect } from '@playwright/test';
import { stepClick } from '../../../../utils/UIHelper'; 


export class LeaveNavigatorComponent {
  readonly page: Page;
  readonly entitlementsDropDown: Locator;
  readonly addEntitlementsItem: Locator;
  readonly leaveList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.entitlementsDropDown = page.getByRole('listitem').filter({ hasText: 'Entitlements' });
    this.addEntitlementsItem = page.getByRole('menuitem', { name: 'Add Entitlements' });
    this.leaveList = page.getByRole('link', { name: 'Leave List' });
  }

  async openAddEntitlements() {
    await stepClick(this.entitlementsDropDown, 'Entitlements Dropdown')
    await stepClick(this.addEntitlementsItem, "Add Entitlements")
  }

  async openLeaveList() {
    await stepClick(this.leaveList, "Leave List")
  }
}