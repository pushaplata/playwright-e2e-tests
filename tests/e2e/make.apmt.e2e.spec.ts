import { test, expect } from "@playwright/test";
import { log } from "../helpers/logger.js";
import MakeApmtHomePage from "../page-objects/make.apmt.home.page.js";
import TestData from "../../data/test-data.js";
import fileHelper from "../helpers/file-helpers.js";
import path from "path";

const csvFilePath = path.resolve(
  `${process.cwd()}/data/functional/make-apmt-test-data.csv`,
);
const paymntData = fileHelper.readCSVFile(csvFilePath); // -> Return the 3 objects from csv file

for (const data of paymntData) {
  test.describe("Make Appointment functionality", () => {
    test.beforeEach(async ({ page }, testInfo) => {
      // Env Config
      const envConfig = testInfo.project.use as any; // Type assertion to access custom config values

      //Create an page object
      const makeApmtHomePage = new MakeApmtHomePage(page);

      //Login
      await makeApmtHomePage.loginToMakeApmtApp(
        envConfig.appURL,
        process.env.TEST_USER_NAME,
        process.env.TEST_PASSWORD,
      );

      // Get login cookies and set it to global variable
      const logincookies = await page.context().cookies();
      process.env.LOGIN_COOKIES = JSON.stringify(logincookies);
    });

    test(`${data.testID} Should make an appointment with non- default valuse`, async ({
      page,
    }) => {
      //Create an page object
      const makeApmtHomePage = new MakeApmtHomePage(page);

      await makeApmtHomePage.makeAppointment(
        data.facility,
        data.hcp,
        data.date,
        
      );
    });
  });
}
