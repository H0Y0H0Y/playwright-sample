import { Page, expect } from "@playwright/test";
import { test } from "fixtures";
import ContactListPage from "models/pom/contactList";

test.describe("Contact List", () => {

    test("User should be redirected to Add Contact page when clicking Add a New Contact button", async ({ page }) => {

        const contactListPage = new ContactListPage(page);
        await contactListPage.goToContactListPage();
        await contactListPage.clickAddNewContactButton();

        await expect(page).toHaveURL('/addContact');
    });

});