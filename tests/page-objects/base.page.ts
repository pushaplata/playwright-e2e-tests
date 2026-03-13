import { expect, type Locator, type Page } from "@playwright/test";
import { log } from "../helpers/logger";
import path from "path";

export default class basePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  //Reusable methods
  async navigateTo(path: string) {
    await log("info", `Navigating to ${path}`);
    await this.page.goto(path);
  }

  //click action
  async click(ele: Locator) {
    try {
      await expect(ele).toBeVisible({ timeout: 10_000 }); //custom timeout default -5 seconds
      await ele.click();
    } catch (error) {
      await log(
        "error",
        `Fail to click element: ${ele.toString()},origal error: ${error}`,
      );
      throw error;
    }
  }

  //type action
  async typeInto(ele: Locator, text: string) {
    try {
      await expect(ele).toBeVisible({ timeout: 20_000 }); //custom timeout default -5 seconds
      await ele.first().fill(text);
    } catch (error) {
      await log(
        "error",
        `Fail to type into element: ${ele.toString()},origal error: ${error}`,
      );
      throw error;
    }
  }

  //type dropdown using select option
  async selectDropdownValue(ele: Locator, value: string) {
    try {
      await expect(ele).toBeVisible({ timeout: 10_000 });
      await ele.selectOption(value);
    } catch (error) {
      await log(
        "error",
        `Failed to select dropdown value: ${ele.toString()}, original error: ${error}`,
      );
      throw error;
    }
  }

  //select value from custom dropdown
  async selectFromCustomDropdown(
    page: Page,
    dropdownLocator: Locator,
    optionText: string,
  ) {
    try {
      await dropdownLocator.click();
      await page.locator(`value=${optionText}`).click();
    } catch (error) {
      await log(
        "error",
        `Failed to select from custom dropdown: ${dropdownLocator.toString()}, original error: ${error}`,
      );
      throw error;
    }
  }

  //check checkbox
  async checkCheckbox(ele: Locator, value: string) {
    try {
      if (!(await ele.isChecked()) && value.toLowerCase() === "yes") {
        await ele.check();
      }
    } catch (error) {
      await log(
        "error",
        `Failed to check checkbox: ${ele}, original error: ${error}`,
      );
      throw error;
    }
  }

  //select radio button by role without loop
  async selectRadioButtonByRole(page: Page, role: string) {
    await page.getByRole("radio", { name: role }).check();
  }

  //select radio button by locator with loop (work on any radio button group)
  async selectRadioButton(page: Page, locator: string, option: string) {
    const radioButtons = page.locator(locator);
    const count = await radioButtons.count();

    for (let i = 0; i < count; i++) {
      const value = await radioButtons.nth(i).getAttribute("value");
      if (value === option) {
        await radioButtons.nth(i).check();
        break;
      }
    }
  }
}
