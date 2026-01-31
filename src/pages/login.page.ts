import { expect, Page } from '@playwright/test';
import { BasePage } from './base.page';
import * as ui from '../utils/UIHelper'

export class LoginPage extends BasePage{
  private static readonly LOCATORS = {
    loginHeading: (page: Page) => page.getByRole('heading', { name: 'Login' }),
    usernameInput: (page: Page) => page.getByRole('textbox', { name: 'Username' }),
    passwordInput: (page: Page) => page.getByRole('textbox', { name: 'Password' }),
    loginButton: (page: Page) => page.getByRole('button', { name: 'Login' }),
    loginErrorMessage: (page: Page) => page.getByRole('alert'),
    usernameErrorMessage: "//input[@name='username']/parent::div/following-sibling::span",
    passwordErrorMessage: "//input[@name='password']/parent::div/following-sibling::span",
    resetPasswordHeading: (page: Page) => page.getByRole('heading', { name: 'Reset Password' })
  } as const;

  private get = this.createLocatorGetter(LoginPage.LOCATORS)

  constructor(page: Page) {
    super(page)
  }

  async goto() {
    await ui.stepGoto(this.page,'/web/index.php/auth/login', "OrangeHRM Login Page");
  }

  async login(username: string, password: string) {
    await ui.stepFill(this.get('usernameInput'),username, "Username Input")
    await ui.stepFill(this.get('passwordInput'),password, "Password Input");
    await ui.stepClick(this.get('loginButton'), "Login Button");
  }

  async expectLoginPageVisible() {
    await ui.stepExpectContainUrl(this.page, "/login", 'Login Page Page');
    await ui.stepExpectToVisible(this.get('loginHeading'), 'Login Heading');
  }

  async expectLoginErrorMessage() {
    await ui.stepExpectToHaveText(this.get('loginErrorMessage'), "Invalid credentials", "Login Error Message");
  }

  async expectInputErrorMessage(username: string, password: string) {
    if (username === "") {
       await ui.stepExpectToHaveText(this.get('usernameErrorMessage'), "Required", "Username Error Message")
    }

    if (password === "") {
      await ui.stepExpectToHaveText(this.get('passwordErrorMessage'), "Required", "Password Error Message")
    }
  }
}