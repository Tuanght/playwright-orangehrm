import { expect, test as setup } from '../../fixtures/gatekeeper.fixture';
import { getTestDataSimple } from '../../utils/JsonUtil';

setup('Delete Employee', async ({ employeeListPage, page }) => {
  const pimAddCases = getTestDataSimple('pimCases', 'add');
  const pimUpdateCases = getTestDataSimple('pimCases', 'update');
  
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
