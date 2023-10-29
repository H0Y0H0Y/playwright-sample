import { Page, expect } from "@playwright/test";
import { test } from "fixtures";
import LoginPage from "models/pom/login";

test.use({ storageState: { cookies: [], origins: [] } });

test.describe("Login", () => {

    test("User should not be able to login successfully using invalid email", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goToLoginPage();
        await loginPage.fillEmail("invalidEmail");
        await loginPage.fillPassword("P@ssw0rd!");
        const response = await loginPage.clickLoginButton();

        expect(response.ok()).toBeFalsy();
        await expect(await loginPage.getIncorrectUserNameOrPasswordError()).toBeVisible();
    });

    test("User should not be able to login successfully if no email is provided", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goToLoginPage();
        await loginPage.fillPassword("P@ssw0rd!");
        const response = await loginPage.clickLoginButton();

        expect(response.ok()).toBeFalsy();
        await expect(await loginPage.getIncorrectUserNameOrPasswordError()).toBeVisible();
    });

    test("User should not be able to login successfully if no password is provided", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goToLoginPage();
        await loginPage.fillEmail("email@email.com");
        const response = await loginPage.clickLoginButton();

        expect(response.ok()).toBeFalsy();
        await expect(await loginPage.getIncorrectUserNameOrPasswordError()).toBeVisible();
    });
});