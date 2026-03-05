import { test, expect } from "@playwright/test";
import TestData from "../../data/test-data.js";
import fileHelper from "../helpers/file-helpers.js";
import path from "path";


//const studentData = TestData.makeAppointmentTestData(); // -> Return the 3 objects from test-data.ts file

 const csvFilePath = path.resolve(`${process.cwd()}/data/functional/make-apmt-test-data.csv`);
 const paymntData = fileHelper.readCSVFile(csvFilePath) // -> Return the 3 objects from csv file    



//Access the data
for (const data of paymntData) {
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
// Get login cookies and set it to global variable
     const logincookies = await page.context().cookies();
     process.env.LOGIN_COOKIES = JSON.stringify(logincookies);
// Assert the text
    await expect(page.locator("h2")).toContainText("Make Appointment");
  });

  

  test(` ${data.testID} Should make a payment with non- default valuse`, async ({ page }) => {

    // Access the login cookies
     console.log(`>> Login Cookies :", ${process.env.LOGIN_COOKIES}`);
     
    //dropdown
    await page.getByLabel("Facility").selectOption(data.facility);

    //checkbox
    await page.getByRole("checkbox", { name: "Apply for hospital readmission" }) .check();

    //radio button
    await page.getByRole("radio", { name: data.hcp }).check();

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
   
}



