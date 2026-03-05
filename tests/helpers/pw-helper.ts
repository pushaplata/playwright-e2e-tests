import {test, type Page, type Locator} from "@playwright/test";

/**
 *Take a screenshot of the full page 
* @param page - Playwright Page object
* @param screenshotName - Name of the screenshot to be attached in the report
 */
async function takeFullPageScreenshot(page: Page, screenshotName: string) {
    const screenshot =  page.screenshot({ fullPage: true });

    //Attach the screenshot to the test report
    
        await test.info().attach(screenshotName, {
            body: await screenshot,
            contentType: "image/png"
        })

}

/** Element screenshot
 * @param element - Playwright Locator object
 * @param screenshotName - Name of the screenshot to be attached in the report
 */

async function takeElementScreenshot(element: Locator, screenshotName: string) {
    const screenshot =  element.screenshot();

    //Attach the screenshot to the test report
    
        await test.info().attach(screenshotName, {
            body: await screenshot,
            contentType: "image/png"
        })

}

export default {takeFullPageScreenshot, takeElementScreenshot};

   