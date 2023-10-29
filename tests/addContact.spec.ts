import { Page, expect } from "@playwright/test";
import { test } from "fixtures";
import { faker } from '@faker-js/faker';
import AddContactPage from "models/pom/addContact";
import { ContactInput } from "models/pom/addContact";

test.describe("Add Contact", () => {

    test("User should be able to add a Contact successfully", async ({ page }) => {

        const contactInput: ContactInput = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName()
        };

        const addContactPage = new AddContactPage(page);
        await addContactPage.goToAddContactPage();
        const response = await addContactPage.addContact(contactInput);

        expect(response.ok()).toBeTruthy();
    });
});