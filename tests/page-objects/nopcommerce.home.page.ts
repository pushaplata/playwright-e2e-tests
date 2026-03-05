    import {expect, type Page} from '@playwright/test';
    import BasePage from './base.page.js';
    import { log } from "../helpers/logger.js";

export default class HomePage extends BasePage {

    //constructor
    constructor(page: Page) {
        super(page);
    }

    /**Elements */
    
    get userNameInputBox() {return this.page.getByRole('textbox', { name: 'Email:' })}
    get passwordInputBox() {return this.page.getByRole('textbox', { name: 'Password:' })}
    get loginBtn() {return this.page.getByRole('button', { name: 'Log in' })}


    /** Page Actions*/ 

    async loginNopCommerceApp(url: string, username: string, password: string) {
        await  log('info', `Logging into nopcommerce app: ${url} `);

        //Login
        await this.navigateTo(url);
        await this.typeInto(this.userNameInputBox, username);
        await this.typeInto(this.passwordInputBox, password);
        await this.click(this.loginBtn);

        //Assert the URL
        await expect(this.page).toHaveURL(`${url}admin/`);
        await log('info', "Successfully launched the home page");

    }


}

