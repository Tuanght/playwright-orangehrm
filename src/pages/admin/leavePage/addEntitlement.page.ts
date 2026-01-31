import { chromium } from '@playwright/test';
import { test, expect, Page } from '@playwright/test';
import * as ui from '../../../utils/UIHelper'
import { BaseLeavePage } from './baseLeave.page';
import * as type from '../../../type/leave.type'

export class AddEntitlementsPage extends BaseLeavePage{
  private static readonly LOCATORS = {
    addEntitlementsHeading: (page: Page) => page.getByText('Add Leave Entitlement'),
    addToIndividualEmployeeRadio: "//input[@type='radio'][@value='0']",
    addToMultipleEmployeeRadio: "//input[@type='radio'][@value='1']",
    employeeNameInput: (page: Page) => page.getByRole('textbox', { name: 'Type for hints...' }),
    leaveTypeDropdown: "//div[normalize-space()='Leave Type']/following-sibling::div//i",
    leavePeriodDropdown: "//div[normalize-space()='Leave Period']/following-sibling::div//i",
    period2026Item: (page: Page) => page.getByRole('option', { name: '-01-01 - 2026-31-12' }),
    entitlementInput: (page: Page) => page.getByRole('textbox').nth(2),
    saveButton: (page: Page) => page.getByRole('button', { name: 'Save' }),
    headingPopupConfirmAdd: (page: Page) => page.getByText('Updating Entitlement'),
    confirmButton: (page: Page) => page.getByRole('button', { name: 'Confirm' }),
    cancelButton: (page: Page) => page.getByRole('dialog').getByRole('button', { name: 'Cancel' }),
    successMessage: (page: Page) => page.getByText('SuccessSuccessfully Saved×')
  } as const;

  private get = this.createLocatorGetter(AddEntitlementsPage.LOCATORS);

  constructor(page: Page) {
    super(page)
  }

  async goto() {
    await ui.stepGoto(this.page,'/web/index.php/leave/addLeaveEntitlement', "Add Entitlement Page");
  }

  async expectAddEntitlementPage() {
    await ui.stepExpectContainUrl(this.page, '/leave/addLeaveEntitlement','Add Entitlement Page');
    await ui.stepExpectToVisible(this.get('addEntitlementsHeading'), 'Add Entitlements Heading')
  }

  async addEntitlement(_data: Partial<type.AddEntitlementType>) {
      if(_data.addTo) {
        if (_data.addTo === 'Individual') {
          await ui.stepCheck(this.get('addToIndividualEmployeeRadio'), 'Individual Employee Radio')
        } else {
          await ui.stepCheck(this.get('addToMultipleEmployeeRadio'), 'Multiple Employee Radio')
        }
      }
      if(_data.employeeName) {
        await ui.stepFill(this.get('employeeNameInput'), _data.employeeName, "EmployeeName Input")
        await ui.stepClick(this.page.getByRole('option', { name: _data.employeeName }), 'Searching Result');
      }
      if(_data.leaveType) {
        await ui.stepClick(this.get('leaveTypeDropdown'), 'Leave Type Dropdown')
        await this.selectOptionLeaveTypeDropdown(_data.leaveType)
      }
      // if(_data.leavePeriod) {
      //   await ui.stepClick(this.get('leavePeriodDropdown'), 'Leave Period Dropdown')
      //   if (_data.leavePeriod === '2026-01-01 - 2026-31-12') {
      //     await ui.stepClick(this.get('period2026Item'), 'Period 2026 Item')
      //   }
      // }
      if(_data.entitlement) {
        await ui.stepFill(this.get('entitlementInput'), _data.entitlement, "Entitlement Input")
      }
      await ui.stepClick(this.get('saveButton'),"Save Button")

      // Confirm Popup
      await ui.stepExpectToVisible(this.get('headingPopupConfirmAdd'), 'Heading Popup Confirm Add')
      await ui.stepClick(this.get('confirmButton'), 'Confirm Button')
      await ui.stepExpectToVisible(this.get('successMessage'), 'Success Message')
    }
}