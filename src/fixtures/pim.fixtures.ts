import { DashboardAdminPage } from './../pages/admin/dashboardAdmin.page';
import { UpdateEmployeePage } from './../pages/admin/pimPage/updateEmployee.page';
import { AddEmployeePage } from './../pages/admin/pimPage/addEmployee.page';
import { EmployeeListPage } from './../pages/admin/pimPage/employeeList.page';
import { EntitlementManagementPage } from './../pages/admin/leavePage/entitlementManagement.page';
import { LeaveListPage } from './../pages/admin/leavePage/leaveList.page';
import { Fixtures, PlaywrightTestArgs } from '@playwright/test';
import { AuthFixtures } from './auth.fixtures';
import * as type from '../type/pim.type';
import { LoginPage } from '../pages/login.page';

export type PIMFixtures = {
  employeeListPage: EmployeeListPage;
  addEmployeePage: AddEmployeePage;
  addEmployeeForAdminPage: UpdateEmployeePage;
  addESSUserForLeavePage: EntitlementManagementPage;
  addESSUserForLoginPage: LoginPage;
};

type AppDeps = PlaywrightTestArgs & AuthFixtures & PIMFixtures;

export const pimFixtures = {
  employeeListPage: [async ({ dashboardPage }: AppDeps, use: (r: EmployeeListPage) => Promise<void>) => {
    await dashboardPage.navigator.openPIMPage()
    await use(new EmployeeListPage(dashboardPage.page));
  }, { scope: 'test', title: 'Go to PIM Page' }],

  addEmployeePage: [async ({ employeeListPage }: AppDeps, use: (r: AddEmployeePage) => Promise<void>) => {
    await employeeListPage.expectEmployeeListPage()
    await employeeListPage.clickAddButton()
    await use(new AddEmployeePage(employeeListPage.page));
  }, { title: 'Go to Add Employee Page' }],

  addEmployeeForAdminPage: async ({ addEmployeePage }: AppDeps, use: (r: UpdateEmployeePage) => Promise<void>) => {
    const employeeListPage = new EmployeeListPage(addEmployeePage.page)
    const updateEmployeePage = new UpdateEmployeePage(addEmployeePage.page)
    const dataAdd = {
        'firstName': 'john',
        'lastName': 'doe',
        'employeeId': 'E123',
    };

    let dataVerify = {
        'firstMiddleName': 'john',
        'lastName': 'doe',
        'employeeId': 'E123',
    };

    let dataSearch = {
        employeeId: 'E123', 
    };
    await addEmployeePage.expectAddEmployeePage()
    await addEmployeePage.addEmployee(dataAdd)
    await updateEmployeePage.expectEmployeeUpdatePage()
    await updateEmployeePage.verifyEmployeeInfo(dataVerify)
    await addEmployeePage.pimNavigator.openEmployeeList()
    await employeeListPage.expectEmployeeListPage()
    await employeeListPage.searchEmployee(dataSearch)
    await employeeListPage.verifyEmployeeInfo(dataVerify)
    await employeeListPage.navigator.openAdminPage()
    
    await use(new UpdateEmployeePage(employeeListPage.page));
    
    await employeeListPage.navigator.openPIMPage()
    await employeeListPage.expectEmployeeListPage()
    await employeeListPage.searchEmployee(dataSearch)
    await employeeListPage.verifyEmployeeInfo(dataVerify)
    await employeeListPage.clickDeleteButton(dataVerify.employeeId)
    await employeeListPage.deleteEmployee()
    await employeeListPage.searchEmployee(dataSearch)
    await employeeListPage.verifyRecordNotFound()
  },

  addESSUserForLeavePage: async ({ addEmployeePage }: AppDeps, use: (r: EntitlementManagementPage) => Promise<void>) => {
    const employeeListPage = new EmployeeListPage(addEmployeePage.page)
    const updateEmployeePage = new UpdateEmployeePage(addEmployeePage.page)
    const leaveListPage = new LeaveListPage(addEmployeePage.page)
    const dataAdd: Partial<type.AddEmployeeType> = {
        'firstName': 'john',
        'lastName': 'doe',
        'employeeId': 'E123',
        username: 'johndoe',
        status: 'Enabled',
        password: 'ess@123',
        confirmPassword: 'ess@123',

    };

    let dataVerify = {
        'firstMiddleName': 'john',
        'lastName': 'doe',
        'employeeId': 'E123',
    };

    let dataSearch = {
        employeeId: 'E123', 
    };
    await addEmployeePage.expectAddEmployeePage()
    await addEmployeePage.addEmployee(dataAdd, true)
    await updateEmployeePage.expectEmployeeUpdatePage()
    await updateEmployeePage.verifyEmployeeInfo(dataVerify)
    await addEmployeePage.pimNavigator.openEmployeeList()
    await employeeListPage.expectEmployeeListPage()
    await employeeListPage.searchEmployee(dataSearch)
    await employeeListPage.verifyEmployeeInfo(dataVerify)
    await employeeListPage.navigator.openLeavePage()
    await leaveListPage.expectLeaveListPage()
    await leaveListPage.leaveNavigator.openAddEntitlements()

    await use(new EntitlementManagementPage(employeeListPage.page));
  },

  addESSUserForLoginPage: async ({ addEmployeePage }: AppDeps, use: (r: LoginPage) => Promise<void>) => {
    const employeeListPage = new EmployeeListPage(addEmployeePage.page)
    const updateEmployeePage = new UpdateEmployeePage(addEmployeePage.page)
    const dataAdd: Partial<type.AddEmployeeType> = {
        'firstName': 'john',
        'lastName': 'doe',
        'employeeId': 'E123',
        username: 'johndoe',
        status: 'Enabled',
        password: 'ess@123',
        confirmPassword: 'ess@123',

    };

    let dataVerify = {
        'firstMiddleName': 'john',
        'lastName': 'doe',
        'employeeId': 'E123',
    };

    let dataSearch = {
        employeeId: 'E123', 
    };
    await addEmployeePage.expectAddEmployeePage()
    await addEmployeePage.addEmployee(dataAdd, true)
    await updateEmployeePage.expectEmployeeUpdatePage()
    await updateEmployeePage.verifyEmployeeInfo(dataVerify)
    await addEmployeePage.pimNavigator.openEmployeeList()
    await employeeListPage.expectEmployeeListPage()
    await employeeListPage.searchEmployee(dataSearch)
    await employeeListPage.verifyEmployeeInfo(dataVerify)
    await employeeListPage.header.logout()


    await use(new LoginPage(employeeListPage.page));

    const loginPage = new LoginPage(addEmployeePage.page);
    const dashboardAdminPage = new DashboardAdminPage(addEmployeePage.page);

    await employeeListPage.header.logout()
    await loginPage.expectLoginPageVisible()
    await loginPage.login('Admin', 'admin123' )
    await dashboardAdminPage.expectDashboardPage()
    await employeeListPage.navigator.openPIMPage()
    await employeeListPage.expectEmployeeListPage()
    await employeeListPage.searchEmployee(dataSearch)
    await employeeListPage.verifyEmployeeInfo(dataVerify)
    await employeeListPage.clickDeleteButton(dataVerify.employeeId)
    await employeeListPage.deleteEmployee()
    await employeeListPage.searchEmployee(dataSearch)
    await employeeListPage.verifyRecordNotFound()
  },
};
