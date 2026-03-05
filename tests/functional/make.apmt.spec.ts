import { test, expect } from "@playwright/test";
import { log } from "../helpers/logger";  

test.describe("Make Appointment functionality", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    //1. Launching the URL and asserting the title and header 
    // get the URL from the config file
    const envConfig = testInfo.project.use as any; // Type assertion to access the config values

   //custom logs
    await log('info', `Launching the web App in: ${envConfig.envName}`);

    // @ts-ignore
    await page.goto(envConfig.appURL);
    expect(page).toHaveTitle("CURA Healthcare Service"); 
    expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

    //2. Click on make payment link
    await page.getByRole("link", { name: "Make Appointment" }).click();
    expect(page.getByText("Please login to make")).toBeVisible();

    //3. Login to the application successfully
    await page.getByLabel("Username").click();
    await page.getByLabel("Username").fill(process.env.TEST_USER_NAME); // get username from env variable
    await page.getByLabel("Password").click();
    await page.getByLabel("Password").fill(process.env.TEST_PASSWORD); // get password from env variable
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.locator("h2")).toContainText("Make Appointment");
    await log("info", "Login successful, navigated to Make Appointment page");
    await log("error", "The next page is not loaded");
  });

  test("Should make ap[ayment with non- default valuse", async ({ page }) => {
    //dropdown
    await page.getByLabel("Facility").selectOption("Hongkong CURA Healthcare Center");

    //checkbox
    await page.getByRole("checkbox", { name: "Apply for hospital readmission" }) .check();

    //radio button
    await page.getByRole("radio", { name: "Medicaid" }).check();

    //date picker
    await page.getByRole("textbox", { name: "Visit Date" }).click();

    // Selecting month
    await page.getByRole("cell", { name: "18" }).click();

    //text area
    await page.getByRole("textbox", { name: "Comment" }).click();
    await page.getByRole("textbox", { name: "Comment" }).fill("this is test");
    await page.getByRole("button", { name: "Book Appointment" }).click();
  });
});
