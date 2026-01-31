// import { BaseAdminPage } from './baseAdmin.page';
// import { expect, Page } from '@playwright/test';
// import * as ui from '../../../utils/UIHelper'
// import * as type from '../../../type/leave.type'


// export class UpdateUserPage extends BaseAdminPage {
//   private static readonly LOCATORS = {
//     updateUserHeading: (page: Page) => page.getByRole('heading', { name: 'Edit User' }),
//     userRoleDropdown: (page: Page) => page.locator('.oxd-icon.bi-caret-down-fill.oxd-select-text--arrow').first(),
//     userRoleAdminItem: (page: Page) => page.getByRole('option', { name: 'Admin' }),
//     userRoleESSItem: (page: Page) => page.getByRole('option', { name: 'ESS' }),
//     employeeNameInput: (page: Page) => page.getByRole('textbox', { name: 'Type for hints...' }),
//     statusDropdown: "//div[normalize-space()='Status']/following-sibling::div//i",
//     statusEnabledItem: (page: Page) => page.getByRole('option', { name: 'Enabled' }),
//     statusDisabledItem: (page: Page) => page.getByRole('option', { name: 'Disabled' }),
//     userNameInput: (page: Page) => page.getByRole('textbox').nth(2),
//     checkboxChangPassword: '.oxd-icon.bi-check',
//     passwordInput: (page: Page) => page.getByRole('textbox').nth(3),
//     confirmPasswordInput: (page: Page) => page.getByRole('textbox').nth(4),
//     saveButton: (page: Page) => page.getByRole('button', { name: 'Save' }),
//     updateSuccessfullyMessage: (page: Page) =>  page.getByText('SuccessSuccessfully Updated×')
//   } as const;
    
//   private get = this.createLocatorGetter(UpdateUserPage.LOCATORS)

//   constructor(page: Page) {
//     super(page)
//   }

//   async expectUserUpdatePage() {
//     await ui.stepExpectContainUrl(this.page, '/saveSystemUser/', 'User Update Page');
//     await ui.stepExpectToVisible(this.get('updateUserHeading'), 'User Update Heading')
//   }

//   async updateUser(_data: Partial<type.UpdateUserType>, isChangPassword: boolean = false) {
//       if(_data.userRole) {
//         await ui.stepClick(this.get('userRoleDropdown'), 'User Role Dropdown')
//         if (_data.userRole === 'Admin') {
//           await ui.stepClick(this.get('userRoleAdminItem'), 'Admin Item')
//         } else {
//           await ui.stepClick(this.get('userRoleESSItem'), 'ESS Item')
  
//         }
//       }
//       if(_data.employeeName) {
//         await ui.stepFill(this.get('employeeNameInput'), _data.employeeName, "EmployeeName Input")
//         await ui.stepClick(this.page.getByRole('option', { name: _data.employeeName }), 'Searching Result');
//       }
//       if(_data.status) {
//         await ui.stepClick(this.get('statusDropdown'), 'Status Dropdown')
//         if (_data.status === 'Enabled') {
//           await ui.stepClick(this.get('statusEnabledItem'), 'Enabled Item')
//         } else {
//           await ui.stepClick(this.get('statusDisabledItem'), 'Disabled Item')
//         }
//       }
//       if(_data.username) {
//         await ui.stepFill(this.get('userNameInput'), _data.username, "Username Input")
//       }
//       if (isChangPassword) {
//         if(_data.password) {
//           await ui.stepFill(this.get('passwordInput'), _data.password, "Password Input")
//         }
//         if (_data.confirmPassword) {
//           await ui.stepFill(this.get('confirmPasswordInput'), _data.confirmPassword, "Confirm Password Input")
//         }

//       }
//       await ui.stepClick(this.get('saveButton'), "Save Button")
//       await ui.stepExpectToVisible(this.get('updateSuccessfullyMessage'), 'Update Successfully Message')
//     }

//   async clickSaveEmployeeDetail() {
//     await ui.stepClick(this.get('saveButton'), 'Save button')
//   }
// }