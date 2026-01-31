import { DashboardAdminPage } from '../pages/admin/dashboardAdmin.page';
import { test as base, Page , chromium } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { title } from "node:process";

export type AuthFixtures = {
    loginPage: LoginPage;
    authedPage: Page;
    dashboardPage: DashboardAdminPage;
};

export const auth = base.extend<AuthFixtures>({

    loginPage: [async ({page}, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.expectLoginPageVisible()
        await use(loginPage);
    }, { title: 'Goto Login Page' }],

    authedPage: [async ({ loginPage, page }, use) => {
        await loginPage.login("Admin", "admin123");
        await use(page);
    }, { title: 'Login with valid account' }],

    dashboardPage: [async ({ authedPage }, use: (r: DashboardAdminPage) => Promise<void>) => {
        const dashboardPage = new DashboardAdminPage(authedPage);
        await dashboardPage.expectDashboardPage();
        await use(dashboardPage);
    }, { title: 'Go to Dashboard Page' }],
});