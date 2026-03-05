import { test, expect } from "@playwright/test";
import { log } from "../helpers/logger.js";
import HomePage from "../page-objects/nopcommerce.home.page.js";
import CustomerListPage from "../page-objects/nopcommerce.custlist.page.js";
import constants from "../../data/constants.json";

test.describe("E2E Customer Search", () => {
  test("E2E-001: Search for a customer in the system", async ({page, request}, testInfo) => {
    // Env Config
    const envConfig = testInfo.project.use as any; // Type assertion to access custom config values

    /**STEP1: Get list of users */
     // Make GET API call
    await log("info", ` make a get call using ${envConfig.apiURL}`);
    const res = await request.get(
      `${envConfig.apiURL}${constants.REQ_RES_ENDPOINTS.GET_USERS_LIST}`,
      {
        headers: {
          "x-api-key": process.env.RES_RES_API_KEY,
        },
      },
    )

    //Assert the status code
    expect(res.status()).toBe(200);
    await log("info", `The GET call successful with status ${res.status()}`);

    //Get list of users from response body
    const userData = await res.json();
    log("info", `List of users: ${JSON.stringify(userData)}`);

    //Create an page object
    const homePage = new HomePage(page);

    //STEP2: Loginto web
    await homePage.loginNopCommerceApp(
      envConfig.nopcommerceWeb,
      process.env.NOP_COMMERCE_TEST_USER_NAME,
      process.env.NOP_COMMERCE_TEST_PASSWORD,
    );

    //STEP3: Cusetomer Search
    const CUSTOMER_DATA = userData.data

    const customerListPage = new CustomerListPage(page);
    await customerListPage.navigateToCustomerListPage(envConfig.nopcommerceWeb);
    

    for (const user of CUSTOMER_DATA) {

    let customerNotFound = await customerListPage.searchCustomerAndConfirm(user.first_name,user.first_name,);

    if (customerNotFound) {
      await log("warn", `Customer with name ${user.first_name} ${user.last_name} not found in the system.`,
      );
    } else {
        await log( "info", `Customer with name ${user.first_name} ${user.last_name} found in the system.`,
      );
    }

     }
    
  });
});
