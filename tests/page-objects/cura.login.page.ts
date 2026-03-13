import { expect, type Locator } from '@playwright/test';
import BasePage from './base.page';
import { log } from '../helpers/logger';

export default class CuraLoginPage extends BasePage {
  /**
   * Element Locators
   */

  get makeApmtLink() {
    return this.page.getByRole("link", { name: "Make Appointment" });
  }
  get usernameInput(): Locator {
    return this.page.getByLabel('Username');
  }

  get passwordInput(): Locator {
    return this.page.getByLabel('Password');
  }

  get loginButton(): Locator {
    return this.page.getByRole('button', { name: 'Login' });
  }

  get loginHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Login' });
  }

  get errorMessage(): Locator {
    return this.page.getByText('Login failed! Please ensure the username and password are valid.');
  }

  get historyLink(): Locator {
    return this.page.getByRole('link', { name: 'History' });
  }

  get profileLink(): Locator {
    return this.page.getByRole('link', { name: 'Profile' });
  }

  get logoutLink(): Locator {
    return this.page.getByRole('link', { name: 'Logout' });
  }

  get makeAppointmentHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Make Appointment' });
  }

  /**
   * Page Actions
   */
  async navigateToLoginPage(url: string): Promise<void> {
    await log('info', `Navigating to CURA login page: ${url}`);
    await this.navigateTo(url);
   // await expect(this.loginHeading).toBeVisible();
    //await log('info', 'Login page loaded successfully');
     await this.makeApmtLink.click();
  }

  async loginWithCredentials(username: string, password: string): Promise<void> {
    await log('info', `Attempting login with username: ${username}`);
     await expect(this.page.getByText("Please login to make")).toBeVisible();

    await this.usernameInput.click();
    await this.typeInto(this.usernameInput, username);
    await this.passwordInput.click();
    await this.typeInto(this.passwordInput, password);
    await this.click(this.loginButton);
    await log('info', 'Login credentials submitted');
  }

  async verifySuccessfulLogin(): Promise<void> {
    await log('info', 'Verifying successful login');
    
    // Verify redirect to appointment page
    await expect(this.page).toHaveURL(/.*appointment/);
    await log('info', 'User redirected to appointment page');
    
    // Verify navigation menu elements are visible
    await expect(this.historyLink).toBeVisible();
    await expect(this.profileLink).toBeVisible();
    await expect(this.logoutLink).toBeVisible();
    await log('info', 'Navigation menu verified (History, Profile, Logout visible)');
    
    // Verify Make Appointment form is displayed
    await expect(this.makeAppointmentHeading).toBeVisible();
    await log('info', 'Make Appointment form is displayed');
  }

  async verifyFailedLogin(): Promise<void> {
    await log('info', 'Verifying failed login');
    
    // Verify error message is displayed
    await expect(this.errorMessage).toBeVisible();
    await log('info', 'Error message verified');
    
    // Verify user remains on login page
    await expect(this.page).toHaveURL(/.*login/);
    await log('info', 'User remains on login page');
    
    // Verify login form is still visible
    await expect(this.loginHeading).toBeVisible();
    await expect(this.loginButton).toBeVisible();
    await log('info', 'Login form verified as still visible');
  }
}
