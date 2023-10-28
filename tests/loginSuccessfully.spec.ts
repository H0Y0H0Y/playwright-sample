import { Page, expect } from "@playwright/test";
import { test } from "fixtures";
import LoginPage from "models/pom/login";

test.use({ storageState: { cookies: [], origins: [] } });

test.describe("Login", () => {

    test("User should be able to login successfully", async ({ signupUser, page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goToLoginPage();
        const response = await loginPage.login(signupUser.email, signupUser.password);

        expect(response.ok()).toBeTruthy();
        await expect(page).toHaveURL('/contactList');
    });
});