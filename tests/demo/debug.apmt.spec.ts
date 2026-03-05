import { test, expect } from "@playwright/test";

test.describe("Make Appointment functionality", () => {
  test.beforeEach(async ({ page }) => {
    //1. Launching the URL and asserting the title and header 
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    expect(page).toHaveTitle("CURA Healthcare Service"); 
    expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

    //2. Click on make payment link
    await page.getByRole("link", { name: "Make Appointment" }).click();
    expect(page.getByText("Please login to make")).toBeVisible();

    //3. Login to the application successfully
    await page.getByLabel("Username").click();
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").click();
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.locator("h2")).toContainText("Make Appointment");
  });

  test("Should make ap[ayment with non- default valuse", async ({ page }) => {
    //dropdown
    await page.getByLabel("Facility").selectOption("Hongkong CURA Healthcare Center");

    //checkbox
    await page.getByRole("checkbox", { name: "Apply for hospital readmission" }) .check();

    // debugger
    await page .pause();

    //radio button
    await page.getByRole("radio", { name: "Medicaid" }).check();

    //date picker
    await page.getByRole("textbox", { name: "Visit Date (Required)" }).click();

    // Selecting month
    //await page.getByRole("cell", { name: "18" }).click();

    //text area
    await page.getByRole("textbox", { name: "Comment" }).click();
    await page.getByRole("textbox", { name: "Comment" }).fill("this is test");
    await page.getByRole("button", { name: "Book Appointment" }).click();
  });
});
