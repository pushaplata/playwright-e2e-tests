    import {expect, type Page} from '@playwright/test';
    import BasePage from './base.page.js';
    import { log } from "../helpers/logger.js";

export default class CustomerListPage extends BasePage {

    //constructor
    constructor(page: Page) {
        super(page);
    }

    /**Elements */
    get customerMainDropDrown() {return this.page.getByRole('link', { name: 'Customers', exact: true })}
    get customerListSubMenu() {return this.page.getByRole('link', { name: 'Customers' }).nth(1) }
    get firstNameInputBox() {return this.page.getByRole('textbox', { name: 'First name' })}
    get lastNameInputBox() {return this.page.getByRole('textbox', { name: 'Last name' })}
    get searchBtn() {return this.page.getByRole('button', { name: 'Search' })}
    get noDataAvailableCell() {return this.page.locator("[id= search-customers]")};

    //Naviagte to the customer list page
    async navigateToCustomerListPage(customerListPage: string) {
        await log("info",`Navigating to Customer List Page`)
        await this.navigateTo(customerListPage);
        await this.customerMainDropDrown.click();
       await  this.customerListSubMenu.click();
        
    }
//await page.getByRole('link', { name: 'Customers', exact: true }).click();

    /**Page Actions*/ 
    async searchCustomerAndConfirm(firstName: string, lastName: string): Promise<boolean> {
        await log("info",`Searching for customer with name: ${firstName} ${lastName}`)

        //Search action
        await this.typeInto(this.firstNameInputBox, firstName);
        await this.typeInto(this.lastNameInputBox, lastName);
        await this.click(this.searchBtn);

        //Check wether customer is presernt or not
        await this.page.waitForTimeout(1_500);
        let customerFound = await this.noDataAvailableCell.isVisible();
        return customerFound

    }

   
    }




