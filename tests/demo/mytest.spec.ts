import { test, expect, devices } from "@playwright/test";
import constants from "../../data/constants.json";

test("Should navigate to example.com and check title", async ({page}) =>{

    await page.goto("https://katalon-demo-cura.herokuapp.com/")

    expect(page).toHaveTitle("CURA Healthcare Service");

    expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");


})

test("Should demo donfig file", async ({page},testInfo) =>{

    console.log(` >>This is demo test to check config file ${JSON.stringify(testInfo.config)}`);

})

test("Should demo fixture file", async ({page}, testInfo) =>{

    console.log(` >>This is demo test to check fixture file ${Object.keys(devices)}`);

})

test("Should demo for parllel execution 1",{tag: '@demo'}, async ({page}, testInfo) =>{

  await page.goto("https://katalon-demo-cura.herokuapp.com/")

})

test("Should demo for parllel execution 2",{tag: '@demo'}, async ({page}, testInfo) =>{

  await page.goto("https://katalon-demo-cura.herokuapp.com/")

})

test.only("Should demo for constants data",{tag: '@demo'}, async ({page}, testInfo) =>{

  console.log(` >>This is demo test to check constants data ${JSON.stringify(constants.STATUSCODE)}`);

})