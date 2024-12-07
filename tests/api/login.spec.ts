import { expect } from "@playwright/test";
import { test } from "fixtures";
import { faker } from "@faker-js/faker";
import LoginApi from "models/api/loginApi";
import { successSchema } from "models/api/schemas/login.schema";

test.use({ storageState: { cookies: [], origins: [] } });

test.describe("Login API", () => {

    test("should not be able to login with a non-existing email", async ({ signupUser, page }) => {

        // just using the email of an existing user but append a random string
        // to make sure the email is not existing
        const email = `${signupUser.email}${faker.string.alphanumeric(5)}`;
        
        const response = await LoginApi.login(page, email, faker.internet.password());
        expect(response.ok()).toBeFalsy();
    });

    test("should not be able to login with a wrong password", async ({ signupUser, page }) => {

        const response = await LoginApi.login(page, signupUser.email, signupUser.password + 'wrong');
        expect(response.ok()).toBeFalsy();
    });

    test("should be able to login with correct credentials", async ({ signupUser, page }) => {

        const response = await LoginApi.login(page, signupUser.email, signupUser.password);
        const responseJson = await response.json();
        
        expect(response.ok()).toBeTruthy();
        expect(() => successSchema.parse(responseJson)).not.toThrow();

        expect(responseJson.user.firstName).toBe(signupUser.firstName);
        expect(responseJson.user.lastName).toBe(signupUser.lastName);
        expect(responseJson.user.email).toBe(signupUser.email);
    });
});