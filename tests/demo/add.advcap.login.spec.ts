import { test, expect } from "@playwright/test";

test.describe("Login functionality", () => {
  test.beforeEach(async ({ page }) => {
    //1. Launching the URL and asserting the title and header
    await page.goto("https://katalon-demo-cura.herokuapp.com/", {timeout: 60_000}); //will run over the config option timeout
    expect(page).toHaveTitle("CURA Healthcare Service");
    expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

    //2. Click on make payment link
    await page.getByRole("link", { name: "Make Appointment" }).click();
    expect(page.getByText("Please login to make")).toBeVisible();
  });

/** ---Capability Auto-Waiting--------
 * @Scenarios
 * 1. Just locator element - lazy
 *   -> no action proves that locator is lazy. 
 * 2. invalid Locator  - perform action method
 *   -> Error: locator.fill: Test timeout of 30000ms exceeded.
 * 3. Valid locator but invallid action
 *  ->  Error: locator.check: Error: Not a checkbox or radio button
 * 4. Invalid locator on expected method.
 *  -> Error: expect(locator).toContainText(expected) failed, Timeout: 5000ms
 */

  test.only("Should login successfully", async ({ page }) => {
    //1. Login to the application successfully
    await page.getByLabel("Username").click();
    // let useName = page.getByLabel("Username");
    // await useName.check();

    //Timeout
    // test.slow();
    // test.setTimeout(60_000);

    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").click();
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click({timeout: 10_000});
    await expect(page.locator("h5")).toContainText("Make Appointment",{timeout: 10_000});
  });

  test("Should prevent the login with incorrect cred", async ({ page }) => {
    //3. Login to the application unsuccessfully
    await page.getByLabel("Username").click();
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").click();
    await page.getByLabel("Password").fill("ThisIsNotPassword");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.locator("#login")).toContainText(
      "Login failed! Please ensure the username and password are valid."
    );
  });
});
