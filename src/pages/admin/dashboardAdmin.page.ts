import { BasePage } from '../base.page';
import { expect, Page } from "@playwright/test";
import { stepExpectContainUrl, stepExpectToVisible } from "../../utils/UIHelper";

export class DashboardAdminPage extends BasePage {
    private static readonly LOCATOR = {
        DashboardHeading: (page: Page) => page.getByRole('heading', { name: 'Dashboard' })
    }

    private get = this.createLocatorGetter(DashboardAdminPage.LOCATOR)
    
    constructor(page: Page) {
        super(page)
    }

    async expectDashboardPage() {
        await stepExpectContainUrl(this.page, '/dashboard', 'Dashboard Page');
        await stepExpectToVisible(this.get('DashboardHeading'), 'Dashboard Heading');
    }
}