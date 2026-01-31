import { expect, Page } from '@playwright/test';
import * as ui from '../../../utils/UIHelper'
import { BaseLeavePage } from './baseLeave.page';
import * as type from '../../../type/leave.type'

export class EntitlementManagementPage extends BaseLeavePage {
  private static readonly LOCATORS = {
    entitlementManagementHeading: (page: Page) => page.getByRole('heading', { name: 'Leave Entitlements' }),
    loadingSpinner: '.oxd-loading-spinner-container',
    addButton: (page: Page) => page.getByRole('button', { name: 'Add' }),
    employeeNameInput: (page: Page) => page.getByRole('textbox', { name: 'Type for hints...' }),
    leaveTypeDropdown: "//div[normalize-space()='Leave Type']/following-sibling::div//i",
    leavePeriodDropdown: "//div[normalize-space()='Leave Period']/following-sibling::div//i",
    period2026Item: (page: Page) => page.getByRole('option', { name: '2026-01-01 - 2026-31-12' }),
    searchButton: (page: Page) => page.getByRole('button', { name: 'Search' }),
    recordNotFoundMessage: (page: Page) =>   page.getByText('InfoNo Records Found×'),
    recordNotFoundText: (page: Page) => page.getByText('No Records Found'),

    // Delete Popup
    headingDeleteEmployee: (page: Page) => page.getByText('Are you Sure?'),
    cancelButton: (page: Page) => page.getByRole('button', { name: 'No, Cancel' }),
    confirmBUtton: (page: Page) => page.getByRole('button', { name: ' Yes, Delete' }),
    deleteSuccessfullyMessage: (page: Page) => page.getByText('SuccessSuccessfully Deleted×')
  } as const;

  private get = this.createLocatorGetter(EntitlementManagementPage.LOCATORS);

  constructor(page: Page) {
    super(page)
  }

  async goto() {
    await ui.stepGoto(this.page,'/web/index.php/leave/viewLeaveEntitlements', "User Management Page");
  }

  async expectEntitlementManagementPage() {
    await ui.stepExpectContainUrl(this.page, '/leave/viewLeaveEntitlements', 'Entitlement Management Page')
    await ui.stepExpectToVisible(this.get('entitlementManagementHeading'), 'Entitlement Management Heading')
  }

  async clickAddButton() {
    await ui.stepClick(this.get('addButton'),"Add Button")
  }

  async searchEmployee(_data: Partial<type.SearchEntitlementType>) {
    if(_data.employeeName) {
      await ui.stepFill(this.get('employeeNameInput'), _data.employeeName, "EmployeeName Input")
      await ui.stepExpectToVisible(this.page.getByRole('option', { name: _data.employeeName }), 'Searching Result')
      await ui.stepClick(this.page.getByRole('option', { name: _data.employeeName }), 'Searching Result');
    }
    if(_data.leaveType) {
      await ui.stepClick(this.get('leaveTypeDropdown'), 'Leave Type Dropdown')
      await this.selectOptionLeaveTypeDropdown(_data.leaveType)
    }
    if(_data.leavePeriod) {
      await ui.stepClick(this.get('leavePeriodDropdown'), 'Leave Period Dropdown')
      if (_data.leavePeriod === '2026-01-01 - 2026-31-12') {
        await ui.stepClick(this.get('period2026Item'), 'Period 2026 Item')
      }
    }
    await ui.stepClick(this.get('searchButton'), "Search button")
  }

  async verifyUserInfo(_data: Partial<type.VerifyEntitlementType>) {
    // await ui.stepExpectToDisabled(this.get('loadingSpinner'), 'Loading Spinner')
    const locatorResultId = `//div[@role='cell'][normalize-space()='${_data.leaveType}']`
    await ui.stepExpectToVisible(this.page.locator(locatorResultId), `Leave Type as ${_data.leaveType}`)
    if(_data.entitlementType) await ui.stepExpectToHaveText(this.page.locator(`(${locatorResultId}/following-sibling::div)[1]`), _data.entitlementType, `Entitlement Type`)
    if(_data.validFrom) await ui.stepExpectToHaveText(this.page.locator(`(${locatorResultId}/following-sibling::div)[2]`), _data.validFrom, `Valid From`)
    if(_data.validTo) await ui.stepExpectToHaveText(this.page.locator(`(${locatorResultId}/following-sibling::div)[3]`), _data.validTo, `Valid To`)
    if(_data.days) await ui.stepExpectToHaveText(this.page.locator(`(${locatorResultId}/following-sibling::div)[4]`), _data.days, `Days`)
  }

  // async cancelDelete() {
  //   await ui.stepClick(this.get('cancelButton'), 'Cancel Button')
  // }

  // async deleteUser() {
  //   await ui.stepExpectToVisible(this.get('headingDeleteEmployee'), 'Heading text "Are you sure"')
  //   await ui.stepClick(this.get('confirmBUtton'), 'Confirm Button')
  //   await ui.stepExpectToVisible(this.get('deleteSuccessfullyMessage'), 'Delete Successfully Message')
  // }

  // async clickEditButton(username: string|undefined) {
  //   const locatorEditBtn = `(//div[@role='cell'][normalize-space()='${username}']/following-sibling::div//button)[2]`
  //   await ui.stepClick(this.page.locator(locatorEditBtn), 'Edit button')
  // }

  // // async clickEditButton() {
  // //   const locatorEditBtn = "(//div[@role='cell']/following-sibling::div//button)[2]"
  // //   await ui.stepClick(this.page.locator(locatorEditBtn), 'Edit button')
  // // }

  // async clickDeleteButton(username: string|undefined) {
  //   const locatorDeleteBtn = `(//div[@role='cell'][normalize-space()='${username}']/following-sibling::div//button)[1]`
  //   await ui.stepClick(this.page.locator(locatorDeleteBtn), 'Delete button')
  // }

  // // async clickDeleteButton() {
  // //   const locatorDeleteBtn = `(//div[@role='cell']/following-sibling::div//button)[1]`
  // //   await ui.stepClick(this.page.locator(locatorDeleteBtn), 'Delete button')
  // // }

  // async verifyRecordNotFound() {
  //   // await ui.stepExpectToVisible(this.get('recordNotFoundText'), 'Text "Record Not Found"');
  //   await ui.stepExpectToVisible(this.get('recordNotFoundMessage'), 'Record Not Found Message');
  // }
}