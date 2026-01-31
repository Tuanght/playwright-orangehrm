import { expect, Page } from '@playwright/test';
import * as ui from '../../../utils/UIHelper'
import { BaseLeavePage } from './baseLeave.page';
import * as type from '../../../type/leave.type'

export class MyLeaveListPage extends BaseLeavePage {
  private static readonly LOCATORS = {
    leaveListHeading: (page: Page) => page.getByRole('heading', { name: 'My Leave List' }),
    leaveTypeDropdown: "//div[normalize-space()='Leave Type']/following-sibling::div//i",
    leaveStatusDropdown: "//div[normalize-space()='Show Leave with Status*']/following-sibling::div//i",
    searchButton: (page: Page) => page.getByRole('button', { name: 'Search' }),
    cancelButton: (page: Page) => page.getByRole('button', { name: 'Cancel' }),
  } as const;

  private get = this.createLocatorGetter(MyLeaveListPage.LOCATORS);

  constructor(page: Page) {
    super(page)
  }

  async goto() {
    await ui.stepGoto(this.page,'/web/index.php/leave/viewLeaveList', "User Management Page");
  }

  async expectMyLeaveListPage() {
    await ui.stepExpectContainUrl(this.page, 'leave/viewMyLeaveList', 'Leave List Page')
    await ui.stepExpectToVisible(this.get('leaveListHeading'), 'Leave List Heading')
  }
  
  async searchEmployee(_data: Partial<type.SearchLeaveListType>) {      
      if(_data.leaveStatus) {
        await ui.stepClick(this.get('leaveStatusDropdown'), 'Leave Status Dropdown')
        await this.selectOptionLeaveStatusDropdown(_data.leaveStatus)
      }
      if(_data.leaveType) {
        await ui.stepClick(this.get('leaveTypeDropdown'), 'Leave Type Dropdown')
        await this.selectOptionLeaveTypeDropdown(_data.leaveType)
      }
      await ui.stepClick(this.get('searchButton'), "Search button")
    }

  async verifyMyLeaveInfo(_data: Partial<type.VerifyLeaveListType>) {
    const locatorResultId = `//div[@role='cell'][normalize-space()='${_data.leaveType}']`
    await ui.stepExpectToVisible(this.page.locator(locatorResultId), `Leave Type as ${_data.leaveType}`)
    if(_data.date) await ui.stepExpectContainText(this.page.locator(`(${locatorResultId}/preceding-sibling::div)[2]`), _data.date, `Date`)
    if(_data.leaveBalance) await ui.stepExpectToHaveText(this.page.locator(`(${locatorResultId}/following-sibling::div)[1]`), `${_data.leaveBalance}.00`, `Leave Balance`)
    if(_data.numberDay) await ui.stepExpectToHaveText(this.page.locator(`(${locatorResultId}/following-sibling::div)[2]`), `${_data.numberDay}.00`, `Number of Days`)
    if(_data.status) await ui.stepExpectToHaveText(this.page.locator(`(${locatorResultId}/following-sibling::div)[3]`), `${_data.status} (${_data.numberDay}.00)`, `Status`)
  }

  async cancelLeave() {
    await ui.stepClick(this.get('cancelButton'), "Cancel Button")
  }
}