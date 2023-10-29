import { Page, Response } from '@playwright/test';

class ContactListPageSelectors {
    static get addNewContactButton(): string { return "xpath=//button[@id='add-contact']" }
}

export default class ContactListPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async clickAddNewContactButton(): Promise<void> {
        await this.page.click(ContactListPageSelectors.addNewContactButton);
        await this.page.waitForURL('/addContact');
    }

    async goToContactListPage(): Promise<void> {
        await this.page.goto('/contactList', { waitUntil: 'load' });
    }
}