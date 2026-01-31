import { UpdateEmployeePage } from '../pages/admin/pimPage/updateEmployee.page';
import { AddEmployeePage } from '../pages/admin/pimPage/addEmployee.page';
import { test } from '../fixtures/gatekeeper.fixture';
import * as type from '../type/pim.type'
import { getTestDataSimple, testDataCatalog } from '../utils/JsonUtil';


test.use({ storageState: { cookies: [], origins: [] } });

test('CRUD PIM', async ({ employeeListPage }) => {
  const pimAddCases = getTestDataSimple('pimCases', 'add');
  const pimUpdateCases = getTestDataSimple('pimCases', 'update');
  const addEmployeePage = new AddEmployeePage(employeeListPage.page)
  const updateEmployee = new UpdateEmployeePage(addEmployeePage.page)

  const dataAdd: Partial<type.AddEmployeeType> = {
    'firstName': pimAddCases.firstName,
    'lastName': pimAddCases.lastName,
    'employeeId': pimAddCases.employeeId
  };

  let dataVerify: Partial<type.VerifyEmployeeType> = {
    'firstMiddleName': `${pimAddCases.firstName} ${pimAddCases.middleName ? pimAddCases.middleName : ''}`.trim(),
    'lastName': pimAddCases.lastName,
    'employeeId': pimAddCases.employeeId,
  };

  let dataSearch: Partial<type.SearchEmployeeType> = {
    employeeId: pimAddCases.employeeId,
  };

  const dataUpdate: Partial<type.UpdateEmployeeType> = {
    employeeId: pimUpdateCases.employeeId, 
    firstName: pimUpdateCases.firstName,
    lastName: pimUpdateCases.lastName
  };

  await test.step('Add Employee', async () => {
    await employeeListPage.expectEmployeeListPage()
    await employeeListPage.clickAddButton()

    await addEmployeePage.expectAddEmployeePage()
    await addEmployeePage.addEmployee(dataAdd)

    await updateEmployee.expectEmployeeUpdatePage()
    await updateEmployee.verifyEmployeeInfo(dataAdd)
    await updateEmployee.pimNavigator.openEmployeeList()

    await employeeListPage.expectEmployeeListPage()
    await employeeListPage.searchEmployee(dataSearch)
    await employeeListPage.verifyEmployeeInfo(dataVerify)
  })

  await test.step('Update Employee', async () => {
    await employeeListPage.clickEditButton(dataVerify.employeeId)
    await updateEmployee.expectEmployeeUpdatePage()
    await updateEmployee.updateEmployeeInfo(dataUpdate)
    await updateEmployee.clickSaveEmployeeDetail()
    await updateEmployee.pimNavigator.openEmployeeList()
    dataSearch = {
      ...dataSearch,
    };
    await employeeListPage.searchEmployee(dataSearch)
    dataVerify = {
      ...dataVerify,
      'firstMiddleName': `${pimUpdateCases.firstName} ${pimAddCases.middleName ? pimAddCases.middleName : ''}`.trim(),
      'lastName': pimUpdateCases.lastName,
    }
    await employeeListPage.verifyEmployeeInfo(dataVerify)
  })

  await test.step('Delete Employee', async () => {
    await employeeListPage.clickDeleteButton(dataVerify.employeeId)
    await employeeListPage.deleteEmployee()
    await employeeListPage.searchEmployee(dataSearch)
    await employeeListPage.verifyRecordNotFound()
  })
});



