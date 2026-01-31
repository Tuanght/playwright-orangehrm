export type SearchUserType = {
    username: string, 
    userRole: 'Admin'|'ESS',
    employeeName: string, 
    status: 'Enabled'|'Disabled',
}

export type AddUserType = {
    username: string, 
    userRole: 'Admin'|'ESS',
    employeeName: string, 
    status: 'Enabled'|'Disabled',
    password: string,
    confirmPassword: string
}

export type VerifyUserType = {  
    username: string, 
    userRole: 'Admin'|'ESS',
    employeeName: string, 
    status: 'Enabled'|'Disabled',
};

export type UpdateUserType = {  
    username: string, 
    userRole: 'Admin'|'ESS',
    employeeName: string, 
    status: 'Enabled'|'Disabled',
    password: string,
    confirmPassword: string
};