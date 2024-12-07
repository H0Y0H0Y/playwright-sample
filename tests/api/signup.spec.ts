import { expect } from "@playwright/test";
import { test } from "fixtures";
import { faker } from "@faker-js/faker";
import SignupApi from "models/api/signupApi";
import { errorSchema, emailExistsSchema, successSchema } from "models/api/schemas/signup.schema";

test.use({ storageState: { cookies: [], origins: [] } });

test.describe("Signup API", () => {

    test("throws an error when firstName is empty", async ({ page }) => {

        const payload = {
            firstName: null,
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        }

        const response = await SignupApi.signup(page, payload);
        const responseJson = await response.json();
        expect(response.ok()).toBeFalsy();
        expect(() => errorSchema.parse(responseJson)).not.toThrow();
        expect(responseJson.errors.firstName.message)
            .toBe("Path `firstName` is required.");
    });

    test("throws an error when lastName is empty", async ({ page }) => {

        const payload = {
            firstName: faker.person.firstName(),
            lastName: null,
            email: faker.internet.email(),
            password: faker.internet.password()
        }

        const response = await SignupApi.signup(page, payload);
        const responseJson = await response.json();
        expect(response.ok()).toBeFalsy();
        expect(() => errorSchema.parse(responseJson)).not.toThrow();
        expect(responseJson.errors.lastName.message)
            .toBe("Path `lastName` is required.");
    });

    test("throws an error when email is empty", async ({ page }) => {

        const payload = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: "",
            password: faker.internet.password()
        }

        const response = await SignupApi.signup(page, payload);
        const responseJson = await response.json();
        expect(response.ok()).toBeFalsy();
        expect(() => errorSchema.parse(responseJson)).not.toThrow();
        expect(responseJson.errors.email.message)
            .toBe("Email is invalid");
    });

    test("throws an error when password is empty", async ({ page }) => {

        const payload = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            password: null
        }

        const response = await SignupApi.signup(page, payload);
        const responseJson = await response.json();
        expect(response.ok()).toBeFalsy();
        expect(() => errorSchema.parse(responseJson)).not.toThrow();
        expect(responseJson.errors.password.message)
            .toBe("Path `password` is required.");
    });

    test("throws an error when email is invalid", async ({ page }) => {
            
        const payload = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: "invalidEmail",
            password: faker.internet.password()
        }

        const response = await SignupApi.signup(page, payload);
        const responseJson = await response.json();
        expect(response.ok()).toBeFalsy();
        expect(() => errorSchema.parse(responseJson)).not.toThrow();
        expect(responseJson.errors.email.message)
            .toBe("Email is invalid");
    });

    test("throws an error when password is less than 7 characters", async ({ page }) => {
            
        const payload = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            password: "abc"
        }

        const response = await SignupApi.signup(page, payload);
        const responseJson = await response.json();
        expect(response.ok()).toBeFalsy();
        expect(() => errorSchema.parse(responseJson)).not.toThrow();
        expect(responseJson.errors.password.message)
            .toBe(`Path \`password\` (\`${payload.password}\`) is shorter than the minimum allowed length (7).`);
    });

    test("throws an error when email already exists", async ({ signupUser, page }) => {
            
        const payload = {
            firstName: signupUser.firstName,
            lastName: signupUser.lastName,
            email: signupUser.email,
            password: signupUser.password
        }

        await SignupApi.signup(page, payload);
        const response = await SignupApi.signup(page, payload);
        const responseJson = await response.json();
        expect(response.ok()).toBeFalsy();
        expect(() => emailExistsSchema.parse(responseJson)).not.toThrow();
        expect(responseJson.message)
            .toBe("Email address is already in use");
    });

    test("successfully signs up a user", async ({ page }) => {
                
        const payload = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email().toLowerCase(),
            password: faker.internet.password()
        }

        const response = await SignupApi.signup(page, payload);
        const responseJson = await response.json();
        expect(response.ok()).toBeTruthy();
        expect(() => successSchema.parse(responseJson)).not.toThrow();

        expect(responseJson.user.firstName).toBe(payload.firstName);
        expect(responseJson.user.lastName).toBe(payload.lastName);
        expect(responseJson.user.email).toBe(payload.email);
    });
});