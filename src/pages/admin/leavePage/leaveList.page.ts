import { expect, Page } from '@playwright/test';
import * as ui from '../../../utils/UIHelper'
import { BaseLeavePage } from './baseLeave.page';
import * as type from '../../../type/leave.type'

export class LeaveListPage extends BaseLeavePage {
  private static readonly LOCATORS = {
    leaveListHeading: (page: Page) => page.getByRole('heading', { name: 'Leave List' }),
    employeeNameInput: (page: Page) => page.getByRole('textbox', { name: 'Type for hints...' }),
    leaveTypeDropdown: "//div[normalize-space()='Leave Type']/following-sibling::div//i",
    leaveStatusDropdown: "//div[normalize-space()='Show Leave with Status*']/following-sibling::div//i",
    searchButton: (page: Page) => page.getByRole('button', { name: 'Search' }),
    approveButton: (page: Page) => page.getByRole('button', { name: 'Approve' }),
    rejectButton: (page: Page) => page.getByRole('button', { name: 'Reject' }),
    successMessage: (page: Page) => page.getByText('SuccessSuccessfully Saved×')
  } as const;

  private get = this.createLocatorGetter(LeaveListPage.LOCATORS);

  constructor(page: Page) {
    super(page)
  }

  async goto() {
    await ui.stepGoto(this.page,'/web/index.php/leave/viewLeaveList', "User Management Page");
  }

  async expectLeaveListPage() {
    await ui.stepExpectContainUrl(this.page, '/leave/viewLeaveList', 'Leave List Page')
    await ui.stepExpectToVisible(this.get('leaveListHeading'), 'Leave List Heading')
  }
  
  async searchLeave(_data: Partial<type.SearchLeaveListType>) {      
      if(_data.leaveStatus) {
        await ui.stepClick(this.get('leaveStatusDropdown'), 'Leave Status Dropdown')
        await this.selectOptionLeaveStatusDropdown(_data.leaveStatus)
      }
      if(_data.leaveType) {
        await ui.stepClick(this.get('leaveTypeDropdown'), 'Leave Type Dropdown')
        await this.selectOptionLeaveTypeDropdown(_data.leaveType)
      }
      if(_data.employeeName) {
        await ui.stepFill(this.get('employeeNameInput'), _data.employeeName, "EmployeeName Input")
        await ui.stepClick(this.page.getByRole('option', { name: _data.employeeName }), 'Searching Result');
      }
      await ui.stepClick(this.get('searchButton'), "Search button")
    }

  async verifyLeaveInfo(_data: Partial<type.VerifyLeaveListType>) {
    const locatorResultId = `//div[@role='cell'][normalize-space()='${_data.employeeName}']`
    await ui.stepExpectToVisible(this.page.locator(locatorResultId), `Employee Name as ${_data.employeeName}`)
    if(_data.date) await ui.stepExpectContainText(this.page.locator(`(${locatorResultId}/preceding-sibling::div)[2]`), _data.date, `Date`)
    if(_data.leaveType) await ui.stepExpectToHaveText(this.page.locator(`(${locatorResultId}/following-sibling::div)[1]`), _data.leaveType, `Leave Type`)
    if(_data.leaveBalance) await ui.stepExpectToHaveText(this.page.locator(`(${locatorResultId}/following-sibling::div)[2]`), `${_data.leaveBalance}.00`, `Leave Balance`)
    if(_data.numberDay) await ui.stepExpectToHaveText(this.page.locator(`(${locatorResultId}/following-sibling::div)[3]`), `${_data.numberDay}.00`, `Number of Days`)
    if(_data.status) await ui.stepExpectToHaveText(this.page.locator(`(${locatorResultId}/following-sibling::div)[4]`), `${_data.status} (${_data.numberDay}.00)`, `Status`)
  }

  async approveLeave() {
    await ui.stepClick(this.get('approveButton'), "Approve Button")
    // await ui.stepExpectToVisible(this.get('successMessage'), "Approve Success Message")
  }

  async rejectLeave() {
    await ui.stepClick(this.get('rejectButton'), "Reject Button")
  }
}