import { test, expect } from '@playwright/test';
import MakeApmtHomePage from '../page-objects/make.apmt.home.page';

test.describe('Test group', () => {
  test('seed', async ({ page }) => {
    const makeApmtHomePage = new MakeApmtHomePage(page);  
    // generate code here.
  });
});
