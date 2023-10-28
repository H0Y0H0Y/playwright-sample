import { test as baseTest, Page } from "@playwright/test";
import SignupApi from "models/api/signupApi";
import { faker } from '@faker-js/faker';

type SignupFixtureType = {
    signupUser: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        token: string;
    }
}

export const test = baseTest.extend<SignupFixtureType>({
    signupUser: async ({ page }, use) => {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = `${firstName}.${lastName}${faker.string.numeric(5)}@mailinator.com`;
        const password = "P@ssw0rd!";
        const payload = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }
        const response = await SignupApi.signup(page, payload);
        const responseJson = await response.json();
        const token = responseJson.token;

        await use({ firstName, lastName, email, password, token });
    }
})