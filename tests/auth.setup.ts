import { Page, expect } from "@playwright/test";
import { test as setup } from "fixtures";
import LoginPage from "models/pom/login";

const authFile = '.auth/user.json';

setup("authenticate", async ({ signupUser, page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    await loginPage.login(signupUser.email, signupUser.password);

    await page.context().storageState({ path: authFile });
});