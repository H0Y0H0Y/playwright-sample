import { Page, expect } from "@playwright/test";
import { test } from "fixtures";
import { faker } from '@faker-js/faker';
import SignupPage from "models/pom/signup";

test.use({ storageState: { cookies: [], origins: [] } });

test.describe("Signup", () => {

    test("User should be able to signup successfully", async ({ page }) => {

        const signupPage = new SignupPage(page);
        await signupPage.goToSignupPage();
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = `${firstName}.${lastName}${faker.string.numeric(5)}@mailinator.com`;
        const password = "P@ssw0rd!";
        const response = await signupPage.signup(
            firstName,
            lastName,
            email,
            password
        );

        expect(response.ok()).toBeTruthy();
        await expect(page).toHaveURL('/contactList');
    });
});