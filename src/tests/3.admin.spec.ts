import { AddUSerPage } from '../pages/admin/adminPage/addUser.page';
import { UpdateUserPage } from '../pages/admin/adminPage/updateUser.page';
import { test } from '../fixtures/gatekeeper.fixture';
import * as type from '../type/admin.type'
import { getTestDataSimple } from '../utils/JsonUtil';
import { UserManagementPage } from '../pages/admin/adminPage/userManagement.page';

const adminAddCases = getTestDataSimple('adminCases', 'add');
const adminUpdateCases = getTestDataSimple('adminCases', 'update');

test('CRUD Admin', async ({ addEmployeeForAdminPage }) => {
  const userManagementPage = new UserManagementPage(addEmployeeForAdminPage.page)
  const addUserPage = new AddUSerPage(userManagementPage.page)
  const updateUSerPage = new UpdateUserPage(userManagementPage.page)

  let userAddData : Partial<type.AddUserType> = {
    username: adminAddCases.username, 
    userRole: adminAddCases.userRole,
    employeeName: adminAddCases.employeeName, 
    status: adminAddCases.status,
    password: adminAddCases.password,
    confirmPassword: adminAddCases.confirmPassword
  }

  let userSearch : Partial<type.SearchUserType> = {
    username: adminAddCases.username, 
  }

  let userAddedVerify : Partial<type.VerifyUserType> = {
    username: adminAddCases.username, 
    userRole: adminAddCases.userRole,
    employeeName: adminAddCases.employeeName
  }

  let userUpdateData : Partial<type.UpdateUserType> = {
    status: adminUpdateCases.status,
  }

  let userUpdateVerify = {
      ...userAddedVerify,
      status: adminUpdateCases.status,
  }

  await test.step('Add User', async () => {
    await userManagementPage.expectUserManagementPage()
    await userManagementPage.clickAddButton()
    await addUserPage.expectAddEmployeePage()
    await addUserPage.addUser(userAddData)
  })

  test.step('Verify User Added', async () => {
    await userManagementPage.expectUserManagementPage()
    await userManagementPage.searchEmployee(userSearch)
    await userManagementPage.verifyUserInfo(userAddedVerify)
  })
  
  await test.step('Update User', async () => {
    await userManagementPage.clickEditButton(userAddedVerify.username)
    await updateUSerPage.expectUserUpdatePage()
    await updateUSerPage.updateUser(userUpdateData)
  })

  await test.step('Verify User Updated', async () => {
    await userManagementPage.expectUserManagementPage()
    await userManagementPage.searchEmployee(userSearch)
    await userManagementPage.verifyUserInfo(userUpdateVerify)
  })
  
  await test.step('Delete User', async () => {
    await userManagementPage.clickDeleteButton(userAddedVerify.username)
    await userManagementPage.deleteUser()
  })

  await test.step('Verify User Deleted', async () => {
    await userManagementPage.searchEmployee(userSearch)
    await userManagementPage.verifyRecordNotFound()
  })
});



