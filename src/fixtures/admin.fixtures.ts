import { UserManagementPage } from './../pages/admin/adminPage/userManagement.page';
import { PlaywrightTestArgs } from '@playwright/test';
import { AuthFixtures } from './auth.fixtures';
import { PIMFixtures } from './pim.fixtures';

export type AdminFixtures = {
  userManagementPage: UserManagementPage
};

type AppDeps = PlaywrightTestArgs & AuthFixtures & AdminFixtures & PIMFixtures;

export const adminFixtures = {
  userManagementPage: [async ({ addEmployeeForAdminPage }: AppDeps, use: (r: UserManagementPage) => Promise<void>) => {
    await use(new UserManagementPage(addEmployeeForAdminPage.page));
  }, {title: 'Go to User Management Page'}],
};
