import {test, expect, Locator}  from "@playwright/test";
import { time } from "console";
 

test("should login", async ({page}) =>{

    await page.goto("https://katalon-demo-cura.herokuapp.com/")

    await page.waitForURL("https://katalon-demo-cura.herokuapp.com/")

    // await page.waitForLoadState('load',timeout: 5000 });

    await page.waitForSelector("//a[@id='btn-make-appointment']", { timeout: 5000 });

    await page.locator("//a[@id='btn-make-appointment']").waitFor({ state: 'visible', timeout: 5000 });

    expect(page.locator("//a[@id='btn-make-appointment']")).toBeVisible({ timeout: 5000 });

    await page.waitForResponse("**/user/auth");


    // custome timout for wait for selector
    await page.click("//a[@id='btn-make-appointment',timeout: 5000]")
    await page.locator("//input[@id='txt-username']").click({timeout: 5000});// recommended to use click action instead of wait for selector as it will wait for the element to be visible and enabled before clicking

    await page.waitForTimeout(5000) // only sued for debugging purpose, not recommended to use in real time scenarios




    });

