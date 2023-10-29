import { Page, expect } from "@playwright/test";
import { test } from "fixtures";
import { faker } from '@faker-js/faker';
import SignupPage from "models/pom/signup";

test.use({ storageState: { cookies: [], origins: [] } });

test.describe("Signup", () => {

    test("User should not be able to signup if First Name is null", async ({ page }) => {

        const signupPage = new SignupPage(page);
        await signupPage.goToSignupPage();
        await signupPage.fillLastName(faker.person.lastName());
        await signupPage.fillEmail(faker.internet.email());
        await signupPage.fillPassword("P@ssw0rd!");
        const response = await signupPage.clickSubmitButton();

        expect(response.ok()).toBeFalsy();
        await expect(await signupPage.getSignupErrorMsgLocator()).toBeVisible();
    });

    test("User should not be able to signup if Last Name is null", async ({ page }) => {

        const signupPage = new SignupPage(page);
        await signupPage.goToSignupPage();
        await signupPage.fillFirstName(faker.person.firstName());
        await signupPage.fillEmail(faker.internet.email());
        await signupPage.fillPassword("P@ssw0rd!");
        const response = await signupPage.clickSubmitButton();

        expect(response.ok()).toBeFalsy();
        await expect(await signupPage.getSignupErrorMsgLocator()).toBeVisible();
    });

    test("User should not be able to signup if Email is null", async ({ page }) => {

        const signupPage = new SignupPage(page);
        await signupPage.goToSignupPage();
        await signupPage.fillFirstName(faker.person.firstName());
        await signupPage.fillLastName(faker.person.lastName());
        await signupPage.fillPassword("P@ssw0rd!");
        const response = await signupPage.clickSubmitButton();

        expect(response.ok()).toBeFalsy();
        await expect(await signupPage.getSignupErrorMsgLocator()).toBeVisible();
    });

    test("User should not be able to signup if Password is null", async ({ page }) => {

        const signupPage = new SignupPage(page);
        await signupPage.goToSignupPage();
        await signupPage.fillFirstName(faker.person.firstName());
        await signupPage.fillLastName(faker.person.lastName());
        await signupPage.fillEmail(faker.internet.email());
        const response = await signupPage.clickSubmitButton();

        expect(response.ok()).toBeFalsy();
        await expect(await signupPage.getSignupErrorMsgLocator()).toBeVisible();
    });
});