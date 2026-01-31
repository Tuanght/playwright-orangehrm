import { BaseLeavePage } from './baseLeave.page';
import { LeaveTypeType } from './../../../type/leave.type';
import { expect, Page } from '@playwright/test';
import * as ui from '../../../utils/UIHelper'
import * as type from '../../../type/leave.type'

export class ApplyLeavePage extends BaseLeavePage{
  private static readonly LOCATORS = {
    applyHeading: (page: Page) => page.getByRole('heading', { name: 'Apply Leave' }),
    loadingSpinner: '.oxd-loading-spinner-container',
    leaveTypeDropdown: '.oxd-icon.bi-caret-down-fill.oxd-select-text--arrow',
    leaveBalanceText: 'form',
    formDateDropdown: (page: Page) => page.getByRole('textbox', { name: 'yyyy-dd-mm' }).first(),
    toDateDropdown: (page: Page) => page.getByRole('textbox', { name: 'yyyy-dd-mm' }).nth(1),
    durationDropdown: "//div[normalize-space()='Duration']/following-sibling::div//i",
    commentArena: 'textarea',
    applyButton: "//button[@type='submit']",
    successfullyMessage: (page: Page) => page.getByText('SuccessSuccessfully Saved×'),
    // recordNotFoundMessage: (page: Page) =>   page.getByText('InfoNo Records Found×'),
    // recordNotFoundText: (page: Page) => page.getByText('No Records Found'),
  } as const;

  private get = this.createLocatorGetter(ApplyLeavePage.LOCATORS);

  constructor(page: Page) {
    super(page)
  }

  async goto() {
    await ui.stepGoto(this.page,'/web/index.php/admin/viewSystemUsers', "User Management Page");
  }

  async expectApplyLeavePage() {
    await ui.stepExpectContainUrl(this.page, '/leave/applyLeave', 'Apply Leave Page')
    await ui.stepExpectToVisible(this.get('applyHeading'), 'Apply Leave Heading')
  }

  async applyLeave(_data: Partial<type.ApplyLeaveType>) {
    if(_data.leaveType) {
      await ui.stepClick(this.get('leaveTypeDropdown'), 'Leave Type Dropdown')
      await this.selectOptionLeaveTypeDropdown(_data.leaveType)
    }
    if(_data.leaveBalance) {
      await ui.stepExpectContainText(this.get('leaveBalanceText'), _data.leaveBalance, 'Leave Balance Text')
    }
    if(_data.formDate) {
      await ui.stepFill(this.get('formDateDropdown'), _data.formDate, "Form Date Input")
    }
    if(_data.toDate) {
      await ui.stepFill(this.get('toDateDropdown'), _data.toDate, "To Date Input")
    } else {
      await ui.stepClick(this.get('toDateDropdown'), "To Date Input")
    }
    if(_data.duration) {
      await ui.stepClick(this.get('durationDropdown'), 'Duration Dropdown')
      await ui.stepClick(this.page.getByRole('link', { name: _data.duration }), `Duration Link ${_data.duration}`)
    }
    if(_data.comment) {
      await ui.stepFill(this.get('commentArena'), _data.comment, "Comment Arena")
    }
    // await ui.stepDbClick(this.get('applyButton'), "Apply Button")
    await this.page.keyboard.press('Enter')
    await ui.stepExpectToVisible(this.get('successfullyMessage'), 'Apply Leave Successfully Message')
  }
}