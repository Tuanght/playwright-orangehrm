export type AddEntitlementType = { 
    addTo: 'Individual'|'Multiple',
    employeeName: string,
    leaveType: keyof LeaveTypeType,
    leavePeriod: '2026-01-01 - 2026-31-12',
    entitlement: string,
};

export type SearchEntitlementType = { 
    employeeName: string,
    leaveType: keyof LeaveTypeType,
    leavePeriod: '2026-01-01 - 2026-31-12'
};

export type VerifyEntitlementType = { 
    leaveType: keyof LeaveTypeType,
    entitlementType: 'Added',
    validFrom: '2026-01-01',
    validTo: '2026-31-12'
    days: string,
};

export type SearchLeaveListType = { 
    employeeName: string,
    leaveType: keyof LeaveTypeType,
    leaveStatus: keyof LeaveStatusType,
};

export type VerifyLeaveListType = { 
    date: string,
    employeeName: string,
    leaveType: keyof LeaveTypeType,
    leaveBalance: string,
    numberDay: string,
    status: keyof LeaveStatusType,
};

export type ApplyLeaveType = { 
    leaveType: keyof LeaveTypeType,
    leaveBalance: string,
    formDate: string,
    toDate: string,
    duration: 'Full Day'|'Half Day - Morning'|'Half Day - Afternoon',
    comment: string
};

export type LeaveStatusType = {
    'Rejected': string,
    'Cancelled': string,
    'Pending Approval': string
    'Scheduled': string,
    'Taken': string
}

export type LeaveTypeType = {
    'CAN - Bereavement': string,
    'CAN - FMLA': string,
    'CAN - Matternity': string
    'CAN - Personal': string,
    'CAN - Vacation': string
}