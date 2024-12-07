import { expect } from "@playwright/test";
import { test } from "fixtures";
import { faker } from "@faker-js/faker";
import ContactApi from "models/api/contactApi";
import { addContactErrorSchema, successSchema } from "models/api/schemas/contact.schema";

test.describe("Contact API", () => {

    test("throws an error when firstName is empty", async ({ page }) => {

        const payload = {
            firstName: "",
            lastName: faker.person.lastName()
        }

        const contactApi = await ContactApi.init(page);
        const response = await contactApi.addContact(payload);
        const responseJson = await response.json();
        expect(response.ok()).toBeFalsy();
        expect(() => addContactErrorSchema.parse(responseJson)).not.toThrow();
        expect(responseJson.errors.firstName.message).toBe("Path `firstName` is required.");
    });

    test("throws an error when lastName is empty", async ({ page }) => {

        const payload = {
            firstName: faker.person.firstName(),
            lastName: ""
        }

        const contactApi = await ContactApi.init(page);
        const response = await contactApi.addContact(payload);
        const responseJson = await response.json();
        expect(response.ok()).toBeFalsy();
        expect(() => addContactErrorSchema.parse(responseJson)).not.toThrow();
        expect(responseJson.errors.lastName.message).toBe("Path `lastName` is required.");
    });

    test("throws an error when email is invalid", async ({ page }) => {
            
        const payload = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: "invalidEmail"
        }

        const contactApi = await ContactApi.init(page);
        const response = await contactApi.addContact(payload);
        const responseJson = await response.json();
        expect(response.ok()).toBeFalsy();
        expect(() => addContactErrorSchema.parse(responseJson)).not.toThrow();
        expect(responseJson.errors.email.message).toBe("Email is invalid");
    });

    test("throws an error when Date of Birth is invalid", async ({ page }) => {
            
        const payload = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            birthdate: "invalidDate"
        }

        const contactApi = await ContactApi.init(page);
        const response = await contactApi.addContact(payload);
        const responseJson = await response.json();
        expect(response.ok()).toBeFalsy();
        expect(() => addContactErrorSchema.parse(responseJson)).not.toThrow();
        expect(responseJson.errors.birthdate.message).toBe("Birthdate is invalid");
    });

    test("throws an error when Phone is invalid", async ({ page }) => {
                
        const payload = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            phone: "invalidPhone"
        }

        const contactApi = await ContactApi.init(page);
        const response = await contactApi.addContact(payload);
        const responseJson = await response.json();
        expect(response.ok()).toBeFalsy();
        expect(() => addContactErrorSchema.parse(responseJson)).not.toThrow();
        expect(responseJson.errors.phone.message).toBe("Phone number is invalid");
    });

    test("throws an error when Postal Code is invalid", async ({ page }) => {
                    
        const payload = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            postalCode: "invalid"
        }

        const contactApi = await ContactApi.init(page);
        const response = await contactApi.addContact(payload);
        const responseJson = await response.json();
        expect(response.ok()).toBeFalsy();
        expect(() => addContactErrorSchema.parse(responseJson)).not.toThrow();
        expect(responseJson.errors.postalCode.message).toBe("Postal code is invalid");
    });

    test("successfully adds a contact with valid data", async ({ page }) => {

        const payload = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email().toLowerCase(),
            birthdate: faker.date.past().toISOString().split('T')[0],
            phone: faker.string.numeric(10),
            street1: faker.location.secondaryAddress(),
            street2: faker.location.street(),
            city: faker.location.city(),
            stateProvince: faker.location.state(),
            postalCode: faker.location.zipCode(),
            country: faker.location.country()
        }

        const contactApi = await ContactApi.init(page);
        const response = await contactApi.addContact(payload);
        const responseJson = await response.json();

        expect(response.ok()).toBeTruthy();
        expect(() => successSchema.parse(responseJson)).not.toThrow();

        expect(responseJson.firstName).toBe(payload.firstName);
        expect(responseJson.lastName).toBe(payload.lastName);
        expect(responseJson.email).toBe(payload.email);
        expect(responseJson.birthdate).toBe(payload.birthdate);
        expect(responseJson.phone).toBe(payload.phone);
        expect(responseJson.street1).toBe(payload.street1);
        expect(responseJson.street2).toBe(payload.street2);
        expect(responseJson.city).toBe(payload.city);
        expect(responseJson.stateProvince).toBe(payload.stateProvince);
        expect(responseJson.postalCode).toBe(payload.postalCode);
        expect(responseJson.country).toBe(payload.country);
    });
});