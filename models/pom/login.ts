import { Page, Response } from '@playwright/test';

class LoginPageSelectors {
    static get emailInput(): string { return "xpath=//input[@id='email']" }
    static get passwordInput(): string { return "xpath=//input[@id='password']" }
    static get loginButton(): string { return "xpath=//input[@id='submit']" }
    static get incorrectUserNameOrPasswordError(): string { return "xpath=//span[@id='error']" }
}

export default class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private async fillEmail(email: string): Promise<void> {
        await this.page.fill(LoginPageSelectors.emailInput, email);
    }

    private async fillPassword(password: string): Promise<void> {
        await this.page.fill(LoginPageSelectors.passwordInput, password);
    }

    private async clickLoginButton(): Promise<Response> {
        const loginPromise: Promise<Response> = this.page.waitForResponse(response =>
            response.url().endsWith('/login') && response.request().method() === 'POST'
        );
        await this.page.click(LoginPageSelectors.loginButton);
        return await loginPromise;
    }

    async goToLoginPage(): Promise<void> {
        await this.page.goto('/login', { waitUntil: 'load' });
    }

    async login(email: string, password: string): Promise<Response> {
        await this.fillEmail(email);
        await this.fillPassword(password);
        const response: Response = await this.clickLoginButton();

        return response;
    }
}