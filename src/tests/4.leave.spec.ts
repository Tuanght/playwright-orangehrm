import { MyLeaveListPage } from '../pages/ess/leavePage/myLeaveList.page';
import { AddEntitlementsPage } from '../pages/admin/leavePage/addEntitlement.page';
import { test } from '../fixtures/gatekeeper.fixture';
import * as type from '../type/leave.type'
import { LoginPage } from '../pages/login.page';
import { ApplyLeavePage } from '../pages/ess/leavePage/apply.page';
import { DashboardEssPage } from '../pages/ess/dashboardEss.page';
import { DashboardAdminPage } from '../pages/admin/dashboardAdmin.page';
import { LeaveListPage } from '../pages/admin/leavePage/leaveList.page';

test('Approve Leave of ESS', async ({ addESSUserForLeavePage }) => {
    const addEntitlementsPage =  new AddEntitlementsPage(addESSUserForLeavePage.page)
    const loginPage =  new LoginPage(addESSUserForLeavePage.page)
    const applyLeavePage =  new ApplyLeavePage(addESSUserForLeavePage.page)
    const myLeaveListPage =  new MyLeaveListPage(addESSUserForLeavePage.page)
    const dashboardAdminPage =  new DashboardAdminPage(addESSUserForLeavePage.page)
    const dashboardEssPage =  new DashboardEssPage(addESSUserForLeavePage.page)
    const leaveListPage =  new LeaveListPage(addESSUserForLeavePage.page)

    await test.step('Add Entitlement for ESS User', async () => {
        await addEntitlementsPage.expectAddEntitlementPage()
        let entitlementData : Partial<type.AddEntitlementType> = {
        addTo:'Individual',
        employeeName: 'john doe',
        leaveType: 'CAN - Personal',
        leavePeriod: '2026-01-01 - 2026-31-12',
        entitlement: '12',
        }
        await addEntitlementsPage.addEntitlement(entitlementData)
    })

    await test.step('Verify Entitlement Added for ESS User', async () => {
        await addESSUserForLeavePage.expectEntitlementManagementPage()
        let dataSearch: Partial<type.SearchEntitlementType> = {
            employeeName: 'john doe',
            leaveType: 'CAN - Personal',
        }
        await addESSUserForLeavePage.searchEmployee(dataSearch)
        let dataVerify: Partial<type.VerifyEntitlementType> = {
            leaveType: 'CAN - Personal',
            entitlementType: 'Added',
            validFrom: '2026-01-01',
            validTo: '2026-31-12',
            days: '12',
        }

        await addESSUserForLeavePage.verifyUserInfo(dataVerify)
    })

    await test.step('Login ESS User and Apply Leave', async () => {
        await addESSUserForLeavePage.header.logout()
        await loginPage.expectLoginPageVisible()
        await loginPage.login('johndoe', 'ess@123' )
        await dashboardEssPage.expectDashboardPage()
        await dashboardEssPage.navigator.openLeavePage()
        await myLeaveListPage.expectMyLeaveListPage()
        await myLeaveListPage.leaveNavigator.openApplyLeave()
        await applyLeavePage.expectApplyLeavePage()
        let applyLeaveData : Partial<type.ApplyLeaveType> = {
            leaveType: 'CAN - Personal',
            leaveBalance: '12',
            formDate: '2026-25-02',
        }
        await applyLeavePage.applyLeave(applyLeaveData)
    })
    let myLeaveVerifyData : Partial<type.VerifyLeaveListType> = {
        date: '2026-25-02',
        leaveType: 'CAN - Personal',
        leaveBalance: '11',
        numberDay: '1',
        status: 'Pending Approval'
    }
    await test.step('Verify Leave Applied', async () => {
        await applyLeavePage.leaveNavigator.openMyLeave()
        await myLeaveListPage.expectMyLeaveListPage()
        await myLeaveListPage.verifyMyLeaveInfo(myLeaveVerifyData)
    })

    await test.step('Login Admin to Approve Leave', async () => {
        await myLeaveListPage.header.logout()
        await loginPage.login('Admin', 'admin123' )
        await dashboardAdminPage.navigator.openLeavePage()
        await leaveListPage.expectLeaveListPage()
        await leaveListPage.searchLeave({
            employeeName: 'john doe',
            leaveType: 'CAN - Personal',
        })
        let leaveVerifyData : Partial<type.VerifyLeaveListType> = {
            ...myLeaveVerifyData,
            employeeName: 'john doe',
        }
        await leaveListPage.verifyLeaveInfo(leaveVerifyData)
        await leaveListPage.approveLeave()
    })

    await test.step('Verify Leave Approved in ESS User', async () => {
        await leaveListPage.header.logout()
        await loginPage.expectLoginPageVisible()
        await loginPage.login('johndoe', 'ess@123' )
        await dashboardEssPage.navigator.openLeavePage()
        await myLeaveListPage.expectMyLeaveListPage()
        await myLeaveListPage.leaveNavigator.openMyLeave()
        await myLeaveListPage.expectMyLeaveListPage()
        let myLeaveVerifyUpdateData : Partial<type.VerifyLeaveListType> = {
            ...myLeaveVerifyData,
            status: 'Scheduled'
        }
        await myLeaveListPage.verifyMyLeaveInfo(myLeaveVerifyUpdateData)
    })
});