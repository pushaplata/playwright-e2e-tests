// spec: tests/e2e/cura-login.e2e.spec.ts
// CURA Healthcare Service Login Tests - Framework Compliant with Environment Integration
// Uses Page Object Model pattern, environment variables, and test configuration

import { test } from '../helpers/config-fixtures';
import CuraLoginPage from '../page-objects/cura.login.page';
import TestData from '../../data/test-data';

test.describe('CURA Healthcare Service - Login', () => {
  let curaLoginPage: CuraLoginPage;

  test.beforeEach(async ({ page }, testInfo) => {
    // Get config from test fixture
    const envConfig = testInfo.project.use as any;

    // Initialize page object
    curaLoginPage = new CuraLoginPage(page);
    
    // Get test data with environment variables and config URL
   // const testData = TestData.curaLoginTestData(envConfig.appURL);

    // Navigate to login page
    await curaLoginPage.navigateToLoginPage(envConfig.appURL);
  });

  // Test Case 1: Positive Login with valid credentials
  test('TC_LOGIN_001 - Positive: Valid credentials login', async ({ page }, testInfo) => {
    const envConfig = testInfo.project.use as any;
    //const testData = TestData.curaLoginTestData(envConfig.appURL);
    //const credential = testData.positive;

    // 1. Enter valid credentials
    await curaLoginPage.loginWithCredentials(process.env.TEST_USERNAME, process.env.TEST_PASSWORD);

    // 2. Verify successful login
    await curaLoginPage.verifySuccessfulLogin();
  });

  // Test Case 2: Negative Login with invalid credentials
  test('TC_LOGIN_002 - Negative: Invalid credentials login', async ({ page }, testInfo) => {
    //const envConfig = testInfo.project.use as any;
    //const testData = TestData.curaLoginTestData(envConfig.appURL);
    //const credential = testData.negative;

    // 1. Enter invalid credentials
    await curaLoginPage.loginWithCredentials(process.env.NEG_TEST_USER_NAME, process.env.NEG_TEST_PASSWORD);

    // 2. Verify failed login
    await curaLoginPage.verifyFailedLogin();
  });
});
