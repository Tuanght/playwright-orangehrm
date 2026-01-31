import { test, expect, Page } from '@playwright/test';
import * as ui from '../../../utils/UIHelper'
import { BasePIMPage } from './basePIM.page';
import * as type from '../../../type/pim.type'

export class AddEmployeePage extends BasePIMPage{
  private static readonly LOCATORS = {
    addEmployeeHeading: (page: Page) => page.getByRole('heading', { name: 'Add Employee' }),
    firstNameInput: (page: Page) => page.getByRole('textbox', { name: 'First Name' }),
    middleName: (page: Page) => page.getByRole('textbox', { name: 'Middle Name' }),
    lastNameInput: (page: Page) => page.getByRole('textbox', { name: 'Last Name' }),
    employeeIdInput: "//div[normalize-space()='Employee Id']/following-sibling::div//input",
    createUserButton: '.oxd-switch-input',
    usernameInput: "//div[normalize-space()='Username']/following-sibling::div/input",
    enabledStatusInput: "//input[@type='radio'][@value='1']",
    disabledStatusInput: "//input[@type='radio'][@value='2']",
    passwordInput: "//div[normalize-space()='Password']/following-sibling::div/input",
    confirmPasswordInput: "//div[normalize-space()='Confirm Password']/following-sibling::div/input",
    saveButton: (page: Page) => page.getByRole('button', { name: 'Save' }),
    successMessage: (page: Page) => page.getByText('SuccessSuccessfully Saved×')
  } as const;

  private get = this.createLocatorGetter(AddEmployeePage.LOCATORS)

  constructor(page: Page) {
    super(page)
  }

  async goto() {
    await ui.stepGoto(this.page,'/web/index.php/pim/viewEmployeeList', "Employee List Page");
  }

  async expectAddEmployeePage() {
    await ui.stepExpectContainUrl(this.page, '/addEmployee', 'Employee Add Page');
    await ui.stepExpectToVisible(this.get('addEmployeeHeading'), 'Employee Add Heading')
  }

  async addEmployee(_data: Partial<type.AddEmployeeType>, isCreateUser: boolean = false) {
    if(_data.firstName) await ui.stepFill(this.get('firstNameInput'),_data.firstName, "FirstName Input")
    if(_data.middleName) await ui.stepFill(this.get('middleName'),_data.middleName, "Middle Input")
    if(_data.lastName) await ui.stepFill(this.get('lastNameInput'),_data.lastName, "LastName Input")
    if(_data.employeeId) await ui.stepFill(this.get('employeeIdInput'),_data.employeeId, "EmployeeId Input")
    if (isCreateUser) {
      await ui.stepCheck(this.get('createUserButton'), 'Create User Button')
      if(_data.username) await ui.stepFill(this.get('usernameInput'),_data.username, "Username Input")
      if(_data.status) {
        if(_data.status === 'Enabled') {
          await ui.stepCheck(this.get('enabledStatusInput'), "Enabled Radio")
        } else {
          await ui.stepCheck(this.get('disabledStatusInput'), "Disabled Radio")
        }
      }
      if(_data.password) await ui.stepFill(this.get('passwordInput'),_data.password, "Password Input")
      if(_data.confirmPassword) await ui.stepFill(this.get('confirmPasswordInput'),_data.confirmPassword, "Confirm Password Input")
    }
    await ui.stepClick(this.get('saveButton'), "Save Button")
    await ui.stepExpectToVisible(this.get('successMessage'), 'User Add Successfully Message')
    
  }

  async getEmployeeId(): Promise<string> {
    let employeeId = ''
    test.step('Get employee id', async () => {
      employeeId = await this.get('employeeIdInput').inputValue()
    })
    return employeeId
  }

}