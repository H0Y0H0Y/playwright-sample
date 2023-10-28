import { Page, Response } from '@playwright/test';

class SignupPageSelectors {
    static get firstNameInput(): string { return "xpath=//input[@id='firstName']" }
    static get lastNameInput(): string { return "xpath=//input[@id='lastName']" }
    static get emailInput(): string { return "xpath=//input[@id='email']" }
    static get passwordInput(): string { return "xpath=//input[@id='password']" }
    static get submitButton(): string { return "xpath=//input[@id='submit']" }
    static get cancelButton(): string { return "xpath=//input[@id='cancel']" }
}

export default class SignupPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private async fillFirstName(firstName: string): Promise<void> {
        await this.page.fill(SignupPageSelectors.firstNameInput, firstName);
    }

    private async fillLastName(lastName: string): Promise<void> {
        await this.page.fill(SignupPageSelectors.lastNameInput, lastName);
    }

    private async fillEmail(email: string): Promise<void> {
        await this.page.fill(SignupPageSelectors.emailInput, email);
    }

    private async fillPassword(password: string): Promise<void> {
        await this.page.fill(SignupPageSelectors.passwordInput, password);
    }

    private async clickSubmitButton(): Promise<Response> {
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
}