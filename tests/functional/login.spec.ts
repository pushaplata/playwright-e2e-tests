import { test, expect } from "@playwright/test";

test.describe("Login functionality", () => {
  test.beforeEach(async ({ page }) => {
    //1. Launching the URL and asserting the title and header
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    expect(page).toHaveTitle("CURA Healthcare Service");
    expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

    //2. Click on make payment link
    await page.getByRole("link", { name: "Make Appointment" }).click();
    expect(page.getByText("Please login to make")).toBeVisible();
  });

  test("Should login successfully", async ({ page }) => {
    //1. Login to the application successfully
    await page.getByLabel("Username").click();
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").click();
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.locator("h2")).toContainText("Make Appointment");
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
