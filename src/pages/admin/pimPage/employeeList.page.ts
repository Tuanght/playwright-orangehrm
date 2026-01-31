import { expect, Page } from '@playwright/test';
import * as ui from '../../../utils/UIHelper'
import { BasePIMPage } from './basePIM.page';
import * as type from '../../../type/pim.type'

export class EmployeeListPage extends BasePIMPage {
  private static readonly LOCATORS = {
    employeeListHeading: (page: Page) => page.getByRole('heading', { name: 'Employee Information' }),
    addButton: (page: Page) => page.getByRole('button', { name: 'Add' }),
    employeeNameInput: (page: Page) => page.getByRole('textbox', { name: 'Type for hints...' }).first(),
    employeeIdInput: (page: Page) => page.getByRole('textbox').nth(2),
    searchButton: (page: Page) => page.getByRole('button', { name: 'Search' }),
    recordNotFoundMessage: (page: Page) =>   page.getByText('InfoNo Records Found×'),
    recordNotFoundText: (page: Page) => page.getByText('No Records Found'),
    selectAll: (page: Page) => page.locator('.oxd-icon.bi-check').first(),
    deleteSelected: (page: Page) => page.getByRole('button', { name: ' Delete Selected' }),

    // Delete Popup
    headingDeleteEmployee: (page: Page) => page.getByText('Are you Sure?'),
    cancelButton: (page: Page) => page.getByRole('button', { name: 'No, Cancel' }),
    confirmBUtton: (page: Page) => page.getByRole('button', { name: ' Yes, Delete' }),
    deleteSuccessfullyMessage: (page: Page) => page.getByText('SuccessSuccessfully Deleted×')
  } as const;

  private get = this.createLocatorGetter(EmployeeListPage.LOCATORS)

  constructor(page: Page) {
    super(page)
  }

  async goto() {
    await ui.stepGoto(this.page,'/web/index.php/pim/viewEmployeeList', "Employee List Page");
  }

  async expectEmployeeListPage() {
    await ui.stepExpectContainUrl(this.page, '/viewEmployeeList', 'Employee Management Page');
    await ui.stepExpectToVisible(this.get('employeeListHeading'), 'Employee Management Heading')
  }

  async clickAddButton() {
    await ui.stepClick(this.get('addButton'),"Add Button")
  }

  async searchEmployee(_data: Partial<type.SearchEmployeeType>) {
    if(_data.fullName)  {
      await ui.stepFill(this.get('employeeNameInput'), _data.fullName, "Employee Name Input")
      // await ui.stepClick(this.page.getByRole('option', { name: _data.fullName }), 'Employee Name Result');
    }
    if(_data.employeeId) await ui.stepFill(this.get('employeeIdInput'), _data.employeeId, "Employee Id Input")
    await ui.stepClick(this.get('searchButton'), "Search button")
  }

  async verifyEmployeeInfo(_data: Partial<type.VerifyEmployeeType>) {
    const locatorResultId = `//div[@role='cell'][normalize-space()='${_data.employeeId}']`
    await ui.stepExpectToVisible(this.page.locator(locatorResultId), 'Employee Id')
    if(_data.firstMiddleName) await ui.stepExpectToHaveText(this.page.locator(`(${locatorResultId}/following-sibling::div)[1]`), _data.firstMiddleName, 'First Name')
    if(_data.lastName) await ui.stepExpectToHaveText(this.page.locator(`(${locatorResultId}/following-sibling::div)[2]`),_data.lastName, 'Last Name')
  }

  async cancelDelete() {
    await ui.stepClick(this.get('cancelButton'), 'Cancel Button')
  }

  async deleteEmployee() {
    await ui.stepExpectToVisible(this.get('headingDeleteEmployee'), 'Heading text "Are you sure"')
    await ui.stepClick(this.get('confirmBUtton'), 'Confirm Button')
    await ui.stepExpectToVisible(this.get('deleteSuccessfullyMessage'), 'Delete Successfully Message')
  }

  async deleteSelectedEmployees() {
    await ui.stepClick(this.get('selectAll'), 'Select All Checkbox')
    await ui.stepClick(this.get('deleteSelected'), 'Delete Selected Button')
    await ui.stepExpectToVisible(this.get('headingDeleteEmployee'), 'Heading text "Are you sure"')
    await ui.stepClick(this.get('confirmBUtton'), 'Confirm Button')
    await ui.stepExpectToVisible(this.get('deleteSuccessfullyMessage'), 'Delete Successfully Message')
  }

  async clickEditButton(id: string|undefined) {
    const locatorEditBtn = `(//div[@role='cell'][normalize-space()='${id}']/following-sibling::div//button)[1]`
    await ui.stepClick(this.page.locator(locatorEditBtn), 'Edit button')
  }

  // async clickEditButton() {
  //   const locatorEditBtn = `(//div[@role='cell']/following-sibling::div//button)[1]`
  //   await ui.stepClick(this.page.locator(locatorEditBtn), 'Edit button')
  // }

  async clickDeleteButton(id: string|undefined) {
    const locatorDeleteBtn = `(//div[@role='cell'][normalize-space()='${id}']/following-sibling::div//button)[2]`
    await ui.stepClick(this.page.locator(locatorDeleteBtn), 'Delete button')
  }

  // async clickDeleteButton() {
  //   const locatorDeleteBtn = `(//div[@role='cell']/following-sibling::div//button)[2]`
  //   await ui.stepClick(this.page.locator(locatorDeleteBtn), 'Delete button')
  // }


  async verifyRecordNotFound() {
    // await ui.stepExpectToVisible(this.get('recordNotFoundText'), 'Text "Record Not Found"');
    await ui.stepExpectToVisible(this.get('recordNotFoundMessage'), 'Record Not Found Message');
  }
}