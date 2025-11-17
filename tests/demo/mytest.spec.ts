import { test, expect } from "@playwright/test";

test("Should navigate to example.com and check title", async ({page}) =>{

    await page.goto("https://katalon-demo-cura.herokuapp.com/")

    expect(page).toHaveTitle("CURA Healthcare Service");

    expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");


})