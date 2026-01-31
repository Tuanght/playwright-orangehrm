import { expect, Page } from '@playwright/test';
import * as ui from '../../../utils/UIHelper'
import { BaseAdminPage } from './baseAdmin.page';
import * as type from '../../../type/admin.type'

export class UserManagementPage extends BaseAdminPage {
  private static readonly LOCATORS = {
    userManagementHeading: (page: Page) => page.getByRole('heading', { name: '/ User Management' }),
    loadingSpinner: '.oxd-loading-spinner-container',
    addButton: (page: Page) => page.getByRole('button', { name: 'Add' }),
    userNameInput: (page: Page) => page.getByRole('textbox').nth(1),
    userRoleDropdown: (page: Page) => page.locator('.oxd-icon.bi-caret-down-fill.oxd-select-text--arrow').first(),
    userRoleAdminItem: (page: Page) => page.getByRole('option', { name: 'Admin' }),
    userRoleESSItem: (page: Page) => page.getByRole('option', { name: 'ESS' }),
    employeeNameInput: (page: Page) => page.getByRole('textbox', { name: 'Type for hints...' }),
    statusDropdown: "//div[normalize-space()='Status']/following-sibling::div//i",
    statusEnabledItem: (page: Page) => page.getByRole('option', { name: 'Enabled' }),
    statusDisabledItem: (page: Page) => page.getByRole('option', { name: 'Disabled' }),
    searchButton: (page: Page) => page.getByRole('button', { name: 'Search' }),
    recordNotFoundMessage: (page: Page) =>   page.getByText('InfoNo Records Found×'),
    recordNotFoundText: (page: Page) => page.getByText('No Records Found'),

    // Delete Popup
    headingDeleteEmployee: (page: Page) => page.getByText('Are you Sure?'),
    cancelButton: (page: Page) => page.getByRole('button', { name: 'No, Cancel' }),
    confirmBUtton: (page: Page) => page.getByRole('button', { name: ' Yes, Delete' }),
    deleteSuccessfullyMessage: (page: Page) => page.getByText('SuccessSuccessfully Deleted×')
  } as const;

  private get = this.createLocatorGetter(UserManagementPage.LOCATORS);

  constructor(page: Page) {
    super(page)
  }

  async goto() {
    await ui.stepGoto(this.page,'/web/index.php/admin/viewSystemUsers', "User Management Page");
  }

  async expectUserManagementPage() {
    await ui.stepExpectContainUrl(this.page, '/viewSystemUsers', 'User Management Page')
    await ui.stepExpectToVisible(this.get('userManagementHeading'), 'User Management Heading')
  }

  async clickAddButton() {
    await ui.stepClick(this.get('addButton'),"Add Button")
  }

  async searchEmployee(_data: Partial<type.SearchUserType>) {
    if(_data.username) {
      await ui.stepFill(this.get('userNameInput'), _data.username, "Username Input")
    }
    if(_data.userRole) {
      await ui.stepClick(this.get('userRoleDropdown'), 'User Role Dropdown')
      if (_data.userRole === 'Admin') {
        await ui.stepClick(this.get('userRoleAdminItem'), 'Admin Item')
      } else {
        await ui.stepClick(this.get('userRoleESSItem'), 'ESS Item')
      }
    }
    if(_data.employeeName) {
        await ui.stepFill(this.get('employeeNameInput'), _data.employeeName, "EmployeeName Input")
        await ui.stepClick(this.page.getByRole('option', { name: _data.employeeName }), 'Searching Result');
    }
    if(_data.status) {
      await ui.stepClick(this.get('statusDropdown'), 'Status Dropdown')
      if (_data.status === 'Enabled') {
        await ui.stepClick(this.get('statusEnabledItem'), 'Enabled Item')
      } else {
        await ui.stepClick(this.get('statusDisabledItem'), 'Disabled Item')

      }
    }
    await ui.stepClick(this.get('searchButton'), "Search button")
  }

  async verifyUserInfo(_data: Partial<type.VerifyUserType>) {
    // await ui.stepExpectToDisabled(this.get('loadingSpinner'), 'Loading Spinner')
    const locatorResultId = `//div[@role='cell'][normalize-space()='${_data.username}']`
    await ui.stepExpectToVisible(this.page.locator(locatorResultId), 'Username')
    if(_data.userRole) await ui.stepExpectToHaveText(this.page.locator(`(${locatorResultId}/following-sibling::div)[1]`), _data.userRole, 'User Role')
    if(_data.employeeName) await ui.stepExpectToHaveText(this.page.locator(`(${locatorResultId}/following-sibling::div)[2]`), _data.employeeName, 'Employee Name')
    if(_data.status) await ui.stepExpectToHaveText(this.page.locator(`(${locatorResultId}/following-sibling::div)[3]`), _data.status, 'Status')
  }

  async cancelDelete() {
    await ui.stepClick(this.get('cancelButton'), 'Cancel Button')
  }

  async deleteUser() {
    await ui.stepExpectToVisible(this.get('headingDeleteEmployee'), 'Heading text "Are you sure"')
    await ui.stepClick(this.get('confirmBUtton'), 'Confirm Button')
    await ui.stepExpectToVisible(this.get('deleteSuccessfullyMessage'), 'Delete Successfully Message')
  }

  async clickEditButton(username: string|undefined) {
    const locatorEditBtn = `(//div[@role='cell'][normalize-space()='${username}']/following-sibling::div//button)[2]`
    await ui.stepClick(this.page.locator(locatorEditBtn), 'Edit button')
  }

  // async clickEditButton() {
  //   const locatorEditBtn = "(//div[@role='cell']/following-sibling::div//button)[2]"
  //   await ui.stepClick(this.page.locator(locatorEditBtn), 'Edit button')
  // }

  async clickDeleteButton(username: string|undefined) {
    const locatorDeleteBtn = `(//div[@role='cell'][normalize-space()='${username}']/following-sibling::div//button)[1]`
    await ui.stepClick(this.page.locator(locatorDeleteBtn), 'Delete button')
  }

  // async clickDeleteButton() {
  //   const locatorDeleteBtn = `(//div[@role='cell']/following-sibling::div//button)[1]`
  //   await ui.stepClick(this.page.locator(locatorDeleteBtn), 'Delete button')
  // }

  async verifyRecordNotFound() {
    // await ui.stepExpectToVisible(this.get('recordNotFoundText'), 'Text "Record Not Found"');
    await ui.stepExpectToVisible(this.get('recordNotFoundMessage'), 'Record Not Found Message');
  }
}