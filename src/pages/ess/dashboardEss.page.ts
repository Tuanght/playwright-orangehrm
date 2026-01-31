import { expect, Page } from "@playwright/test";
import { BasePage } from "../base.page";
import { stepExpectContainUrl, stepExpectToVisible } from "../../utils/UIHelper";

export class DashboardEssPage extends BasePage {
    private static readonly LOCATOR = {
        DashboardHeading: (page: Page) => page.getByRole('heading', { name: 'Dashboard' })
    }

    private get = this.createLocatorGetter(DashboardEssPage.LOCATOR)
    
    constructor(page: Page) {
        super(page)
    }

    async expectDashboardPage() {
        await stepExpectContainUrl(this.page, '/dashboard', 'Dashboard Page');
        await stepExpectToVisible(this.get('DashboardHeading'), 'Dashboard Heading');
    }
}