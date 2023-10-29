import { Page, Response } from '@playwright/test';

export type ContactInput = {
    firstName: string,
    lastName: string,
    dateOfBirth?: string,
    email?: string,
    phoneNumber?: string,
    streetAddress1?: string,
    streetAddress2?: string,
    city?: string,
    stateProvince?: string,
    postalCode?: string,
    country?: string
}

class AddContactSelectors {
    static get firstNameInput(): string { return "xpath=//input[@id='firstName']" }
    static get lastNameInput(): string { return "xpath=//input[@id='lastName']" }
    static get dateOfBirthInput(): string { return "xpath=//input[@id='birthdate']" }
    static get emailInput(): string { return "xpath=//input[@id='email']" }
    static get phoneNumberInput(): string { return "xpath=//input[@id='phone']" }
    static get streetAddress1Input(): string { return "xpath=//input[@id='street1']" }
    static get streetAddress2Input(): string { return "xpath=//input[@id='street2']" }
    static get cityInput(): string { return "xpath=//input[@id='city']" }
    static get stateProvinceInput(): string { return "xpath=//input[@id='stateProvince']" }
    static get postalCodeInput(): string { return "xpath=//input[@id='postalCode']" }
    static get countryInput(): string { return "xpath=//input[@id='country']" }
    static get submitButton(): string { return "xpath=//button[@id='submit']" }
    static get cancelButton(): string { return "xpath=//input[@id='cancel']" }
    static get addContactErrorMessage(): string { return "xpath=//span[@id='error']" }
}

export default class AddContactPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async fillFirstName(firstName: string): Promise<void> {
        await this.page.fill(AddContactSelectors.firstNameInput, firstName);
    }

    async fillLastName(lastName: string): Promise<void> {
        await this.page.fill(AddContactSelectors.lastNameInput, lastName);
    }

    async fillDateOfBirth(dateOfBirth: string): Promise<void> {
        await this.page.fill(AddContactSelectors.dateOfBirthInput, dateOfBirth);
    }

    async fillEmail(email: string): Promise<void> {
        await this.page.fill(AddContactSelectors.emailInput, email);
    }

    async fillPhoneNumber(phoneNumber: string): Promise<void> {
        await this.page.fill(AddContactSelectors.phoneNumberInput, phoneNumber);
    }

    async fillStreetAddress1(streetAddress1: string): Promise<void> {
        await this.page.fill(AddContactSelectors.streetAddress1Input, streetAddress1);
    }

    async fillStreetAddress2(streetAddress2: string): Promise<void> {
        await this.page.fill(AddContactSelectors.streetAddress2Input, streetAddress2);
    }

    async fillCity(city: string): Promise<void> {
        await this.page.fill(AddContactSelectors.cityInput, city);
    }

    async fillStateProvince(stateProvince: string): Promise<void> {
        await this.page.fill(AddContactSelectors.stateProvinceInput, stateProvince);
    }

    async fillPostalCode(postalCode: string): Promise<void> {
        await this.page.fill(AddContactSelectors.postalCodeInput, postalCode);
    }

    async fillCountry(country: string): Promise<void> {
        await this.page.fill(AddContactSelectors.countryInput, country);
    }

    async clickSubmitButton(): Promise<Response> {
        const addContactPromise: Promise<Response> = this.page.waitForResponse(response =>
            response.url().endsWith('/contacts') && response.request().method() === 'POST'
        );
        await this.page.click(AddContactSelectors.submitButton);
        return await addContactPromise;
    }

    async clickCancelButton(): Promise<void> {
        await this.page.click(AddContactSelectors.cancelButton);
    }

    async goToAddContactPage(): Promise<void> {
        await this.page.goto('/addContact', { waitUntil: 'load' });
    }

    async addContact(contact: ContactInput): Promise<Response> {
        await this.fillFirstName(contact.firstName);
        await this.fillLastName(contact.lastName);

        contact.dateOfBirth ? await this.fillDateOfBirth(contact.dateOfBirth) : null;
        contact.email ? await this.fillEmail(contact.email) : null;
        contact.phoneNumber ? await this.fillPhoneNumber(contact.phoneNumber) : null;
        contact.streetAddress1 ? await this.fillStreetAddress1(contact.streetAddress1) : null;
        contact.streetAddress2 ? await this.fillStreetAddress2(contact.streetAddress2) : null;
        contact.city ? await this.fillCity(contact.city) : null;
        contact.stateProvince ? await this.fillStateProvince(contact.stateProvince) : null;
        contact.postalCode ? await this.fillPostalCode(contact.postalCode) : null;
        contact.country ? await this.fillCountry(contact.country) : null;

        const response: Response = await this.clickSubmitButton();

        return response;
    }
}