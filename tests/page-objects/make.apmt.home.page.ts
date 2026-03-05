import { expect, type Page } from "@playwright/test";
import BasePage from "./base.page.js";
import { log } from "../helpers/logger.js";

export default class MakeApmtHomePage extends BasePage {
  //constructor
  constructor(page: Page) {
    super(page);
  }

  /**Elements */
  get makeApmtLink() {
    return this.page.getByRole("link", { name: "Make Appointment" });
  }
  get usernameInputBoxClk() {
    return this.page.getByLabel("Username");
  }
  get usernameInputBox() {
    return this.page.getByLabel("Username");
  }
  get passwordInputBoxClk() {
    return this.page.getByLabel("Password");
  }
  get passwordInputBox() {
    return this.page.getByLabel("Password");
  }
  get loginBtn() {
    return this.page.getByRole("button", { name: "Login" });
  }
  get selectFacility() {
    return this.page.getByLabel("Facility");
  }
  get hospitalReadmissionChkBox() {
    return this.page.getByRole("checkbox", {
      name: "Apply for hospital readmission",
    });
  }
  get medicaidRadioBtn() {
    return this.page.locator("//input[@name='programs' and @type='radio']");
  }
  get visitDate() {
    return this.page.getByRole("textbox", { name: "Visit Date" });
  }
  //get selectDate() {return this.page.getByRole('combobox', { name: '18' })}
  get commentTxtArea() {
    return this.page.getByRole("textbox", { name: "Comment" });
  }
  get bookApmtBtn() {
    return this.page.getByRole("button", { name: "Book Appointment" });
  }

  /** Page Actions*/
 //Method 1: Login to Make Appointment app
  async loginToMakeApmtApp(url: string, username: string, password: string) {
    await log("info", `Logging into Make Appointment app: ${url} `);

    //Login
    await this.navigateTo(url);
    await this.makeApmtLink.click();

    //Assert the make payment page
    await expect(this.page.getByText("Please login to make")).toBeVisible();

    await this.usernameInputBoxClk.click();
    await this.usernameInputBox.fill(username);
    await this.passwordInputBoxClk.click();
    await this.passwordInputBox.fill(password);
    await this.loginBtn.click();

    //Assert the page
    await expect(this.page.locator("h2")).toContainText("Make Appointment");
    await log("info", "Successfully launched the Make Appointment page");
  }

  //Methode 2: Make an appointment
  async makeAppointment(facility: string, radioValue: string, visitDate: string) {
    // Access the login cookies
    console.log(`>> Login Cookies :", ${process.env.LOGIN_COOKIES}`);
    await this.selectFacility.selectOption(facility); 
    await this.hospitalReadmissionChkBox.check();
    await this.selectRadioButtonByRole(this.page, radioValue);
    await this.visitDate.click();
    await this.visitDate.fill(visitDate);
    await this.commentTxtArea.click();
    await this.bookApmtBtn.click();
  }
}
