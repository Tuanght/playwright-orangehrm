import { expect, Page } from '@playwright/test';
import * as ui from '../../utils/UIHelper'
import * as type from '../../type/pim.type'
import { BasePage } from '../base.page';

export class UpdateEmployeePage extends BasePage {
  private static readonly LOCATORS = {
    employeeInfoHeading: (page: Page) => page.getByRole('heading', { name: 'Personal Details' }),
    firstNameInput: (page: Page) => page.getByRole('textbox', { name: 'First Name' }),
    middleNameInput: (page: Page) =>  page.getByRole('textbox', { name: 'Middle Name' }),
    lastNameInput: (page: Page) => page.getByRole('textbox', { name: 'Last Name' }),
    employeeIdInput: "//div[normalize-space()='Employee Id']/following-sibling::div/input",
    maleGenderRadio: "//input[@type='radio'][@value='1']",
    femaleGenderRadio: "//input[@type='radio'][@value='2']",
    saveButton: "(//button[@type='submit'])[1]",
    updateSuccessfullyMessage: (page: Page) =>  page.getByText('SuccessSuccessfully Updated×')
  } as const;
    
  private get = this.createLocatorGetter(UpdateEmployeePage.LOCATORS)

  constructor(page: Page) {
    super(page)
  }

  async expectEmployeeUpdatePage() {
    await ui.stepExpectContainUrl(this.page, '/viewPersonalDetails', 'Employee Update Page');
    await ui.stepExpectToVisible(this.get('employeeInfoHeading'), 'Employee Update Heading')
  }

  async verifyEmployeeInfo(_data: Partial<type.UpdateEmployeeType>) {
    if(_data.firstName) await ui.stepExpectToHaveValue(this.get('firstNameInput'), _data.firstName, 'First Name')
    if(_data.lastName) await ui.stepExpectToHaveValue(this.get('lastNameInput'), _data.lastName, 'Last Name')
    if(_data.employeeId) await ui.stepExpectToHaveValue(this.get('employeeIdInput'), _data.employeeId, 'Employee Id')
  }

  async updateEmployeeInfo(_data: Partial<type.UpdateEmployeeType>) {
    if (_data.employeeId)  await ui.stepExpectToHaveValue(this.get('employeeIdInput'), _data.employeeId, 'EmployeeId Input')
    if (_data.firstName)  await ui.stepFill(this.get('firstNameInput'), _data.firstName, 'FirstName Input')
    if (_data.middleName)  await ui.stepFill(this.get('middleNameInput'), _data.middleName, 'FirstName Input')
    if (_data.lastName) await ui.stepFill(this.get('lastNameInput'), _data.lastName, 'LastName Input')
  }

  async clickSaveEmployeeDetail() {
    await ui.stepClick(this.get('saveButton'), 'Save button')
  }
}