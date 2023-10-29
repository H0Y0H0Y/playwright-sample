import { Page, Response } from '@playwright/test';

class SignupPageSelectors {
    static get firstNameInput(): string { return "xpath=//input[@id='firstName']" }
    static get lastNameInput(): string { return "xpath=//input[@id='lastName']" }
    static get emailInput(): string { return "xpath=//input[@id='email']" }
    static get passwordInput(): string { return "xpath=//input[@id='password']" }
    static get submitButton(): string { return "xpath=//button[@id='submit']" }
    static get cancelButton(): string { return "xpath=//input[@id='cancel']" }
    static get signupErrorMessage(): string { return "xpath=//span[@id='error']" }
}

export default class SignupPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async fillFirstName(firstName: string): Promise<void> {
        await this.page.fill(SignupPageSelectors.firstNameInput, firstName);
    }

    async fillLastName(lastName: string): Promise<void> {
        await this.page.fill(SignupPageSelectors.lastNameInput, lastName);
    }

    async fillEmail(email: string): Promise<void> {
        await this.page.fill(SignupPageSelectors.emailInput, email);
    }

    async fillPassword(password: string): Promise<void> {
        await this.page.fill(SignupPageSelectors.passwordInput, password);
    }

    async clickSubmitButton(): Promise<Response> {
        const signupPromise: Promise<Response> = this.page.waitForResponse(response =>
            response.url().endsWith('/users') && response.request().method() === 'POST'
        );
        await this.page.click(SignupPageSelectors.submitButton);
        return await signupPromise;
    }

    async clickCancelButton(): Promise<void> {
        await this.page.click(SignupPageSelectors.cancelButton);
    }

    async goToSignupPage(): Promise<void> {
        await this.page.goto('/addUser', { waitUntil: 'load' });
    }

    async signup(firstName: string, lastName: string, email: string, password: string): Promise<Response> {
        await this.fillFirstName(firstName);
        await this.fillLastName(lastName);
        await this.fillEmail(email);
        await this.fillPassword(password);
        const response: Response = await this.clickSubmitButton();

        return response;
    }

    async getSignupErrorMsgLocator() {
        return this.page.locator(SignupPageSelectors.signupErrorMessage);
    }
}