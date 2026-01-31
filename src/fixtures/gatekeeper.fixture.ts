import { adminFixtures, AdminFixtures } from './admin.fixtures';
import { auth, AuthFixtures } from './auth.fixtures';

import { pimFixtures, PIMFixtures } from './pim.fixtures';

export type GatekeeperFixtures = AuthFixtures & PIMFixtures & AdminFixtures;

export const test = auth.extend<GatekeeperFixtures>({
...pimFixtures,
...adminFixtures
});

export { expect } from '@playwright/test';