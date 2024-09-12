import { After, Before, setDefaultTimeout } from '@cucumber/cucumber';
import { faker } from '@faker-js/faker';
import { Page } from '@playwright/test';
import SignupApi from 'models/api/signupApi';
import LoginPage from 'models/pom/login';

let page: Page;

setDefaultTimeout(60000);

Before(async () => {
    const loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
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
    await loginPage.login(email, password);

    const authFile = '.auth/user.json';

    await page.context().storageState({ path: authFile });
});

After(async () => {
    const context = page.context();
    await context.close();
});

export { page };