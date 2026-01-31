import { LeaveNavigatorComponent } from './components/leaveNavigator.component';
import { Page } from "@playwright/test";
import { BasePage } from "../../base.page";
import * as ui from '../../../utils/UIHelper'
import * as type from '../../../type/leave.type'

export class BaseLeavePage extends BasePage{
  readonly leaveNavigator: LeaveNavigatorComponent
  constructor(page: Page) {
    super(page)
    this.leaveNavigator = new LeaveNavigatorComponent(page)
  }

    async selectOptionLeaveTypeDropdown(leaveType: keyof type.LeaveTypeType) {
      await ui.stepClick(this.page.getByRole('option', { name: leaveType }), `Leave Type Option ${leaveType}`)
    }  
  
    async selectOptionLeaveStatusDropdown(leaveStatus: keyof type.LeaveStatusType) {
      await ui.stepClick(this.page.getByRole('option', { name: leaveStatus }), `Leave Status Option ${leaveStatus}`)
    }  
}