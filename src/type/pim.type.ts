export type AddEmployeeType = { 
  firstName: string; 
  middleName: string; 
  lastName: string; 
  employeeId: string; 
  username: string; 
  status: 'Enabled'|'Disabled'; 
  password?: string; 
  confirmPassword?: string; 
};

export type UpdateEmployeeType = {
  employeeId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: 'Male'|'Female'
};

export type VerifyEmployeeType = {  
  employeeId: string; 
  firstMiddleName: string; 
  lastName: string;
};

export type SearchEmployeeType = {  
  employeeId: string; 
  fullName: string;
};
