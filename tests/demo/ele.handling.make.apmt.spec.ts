import { test, expect } from "@playwright/test";

test.describe("Make Appointment functionality", () => {
  test.beforeEach(async ({ page }) => {
    //1. Launching the URL and asserting the title and header 
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    expect(page).toHaveTitle("CURA Healthcare Service"); 
    expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

    //1. Click 
    //2. Press
    //3. double click
    //4. right click
    //5. hover if link
    //6. [optional]timeout due to slowness
    await page.getByRole("link", { name: "Make Appointment" }).click();
    // await page.getByRole("link", { name: "Make Appointment" }).press("Enter");
    // page.getByRole("link", { name: "Make Appointment" }).dblclick
    //await page.getByRole("link", { name: "Make Appointment" }).click({button: "right"});
    // page.getByRole("link", { name: "Make Appointment" }).hover();
    //await page.getByRole("link", { name: "Make Appointment" }).click({timeout:10_000});

    expect(page.getByText("Please login to make")).toBeVisible();

    /**
     * Element text box
     * @action
     * 1. clear/ click before fill
     * 2. fill
     * 3. press sequentially (slow type) 
     */
     

    //3. Login to the application successfully
    // fill
    await page.getByLabel("Username").click();
    await page.getByLabel("Username").fill("John Doe");

    //clear
     page.getByLabel("Username").clear();
     await page.getByLabel("Username").fill("John Doe");

     //press sequentially (slow type)
     page.getByLabel("Username").clear();
     await page.getByLabel("Username").pressSequentially("John Doe", {delay: 300});

    await page.getByLabel("Password").click();
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.locator("h2")).toContainText("Make Appointment");
  });

  test("Should make ap[ayment with non- default valuse", async ({ page }) => {

    /**dropdown*/
    // select by default value
    await expect(page.getByLabel("Facility")).toHaveValue("Tokyo CURA Healthcare Center");
    await page.getByLabel("Facility").selectOption("Tokyo CURA Healthcare Center");

    // select by label OR INDEX
    await page.getByLabel("Facility").selectOption({ label: "Seoul CURA Healthcare Center" });
    await page.getByLabel("Facility").selectOption({ index: 0 });

    //Assret the count of dropdown options
    let eleCount =  page.getByLabel("Facility").locator("option")
    await expect(eleCount).toHaveCount(3);

    //get all drop down valuse
    let listOfOptions = await page.getByLabel("Facility").all();

    //for of loop
    let listOptions =[]

    for(let ele of listOfOptions){
      let eleTxt = await ele.textContent();
      if(eleTxt){

        listOptions.push(eleTxt);
      }
    }
    console.log(`>> List of drop down options are: ${listOptions}`)

    

    //checkbox
    await page.getByText("Apply for hospital readmission").check();
    await page.getByText("Apply for hospital readmission").uncheck();

    //radio button
    //Assert the radio button checked or not
    await expect(page.getByRole("radio", { name: "Medicare" })).toBeChecked();
    await page.getByRole("radio", { name: "Medicaid" }).check();
    await expect(page.getByRole("radio", { name: "Medicare" })).not.toBeChecked();

    //date picker
    await page.getByRole("textbox", { name: "Visit Date (Required)" }).click();

    // Selecting month
    await page.getByRole("cell", { name: "18" }).click();

    //text area
    await page.getByRole("textbox", { name: "Comment" }).click();
    await page.getByRole("textbox", { name: "Comment" }).fill("this is test");
    await page.getByRole("button", { name: "Book Appointment" }).click();
  });
});
