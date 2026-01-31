import { expect, test as teardown } from '../../fixtures/gatekeeper.fixture';
import { getTestDataSimple } from '../../utils/JsonUtil';


teardown('Delete Employee', async ({ employeeListPage, page }) => {
  const testData = getTestDataSimple('pimCases', 'add');
  await employeeListPage.expectEmployeeListPage()
  let dataSearch = {
    fullName: 'john',
  };
  await employeeListPage.searchEmployee(dataSearch);
  await page.waitForTimeout(2000);
  const isNotVisible = await page.getByText('InfoNo Records Found×').isVisible();
    if(!isNotVisible) {
      await employeeListPage.deleteSelectedEmployees()
      await employeeListPage.searchEmployee(dataSearch)
      await employeeListPage.verifyRecordNotFound()
    }
});
