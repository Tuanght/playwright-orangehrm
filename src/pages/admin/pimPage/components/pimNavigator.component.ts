// components/header.component.ts
import { type Page, type Locator, expect } from '@playwright/test';
import { stepClick, stepExpectToVisible } from '../../../../utils/UIHelper';


export class PIMNavigatorComponent {
  // Component này không kế thừa BasePage
  readonly page: Page;
  
  // Locators của riêng Header
  readonly employeeList: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Khởi tạo locators
    this.employeeList = page.getByRole('link', { name: 'Employee List' })
  }

  // Hành động của riêng Header
  async openEmployeeList() {
    await stepExpectToVisible(this.employeeList, 'Employee List Tab')
    await stepClick(this.employeeList, "Employee List Tab")
  }
}