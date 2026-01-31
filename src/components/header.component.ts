import { type Page, type Locator } from '@playwright/test';
import { stepClick } from '../utils/UIHelper' 

export class HeaderComponent {
  readonly page: Page;
  
  readonly userIcon: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    
    this.userIcon = page.getByRole('banner').getByRole('img', { name: 'profile picture' })
    this.logoutButton = page.getByRole('menuitem', { name: 'Logout' });
  }

  async logout() {
    await stepClick(this.userIcon, "User Icon")
    await stepClick(this.logoutButton, "Logout button")
  }
}