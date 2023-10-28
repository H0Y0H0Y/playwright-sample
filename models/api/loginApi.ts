import { APIRequestContext, APIResponse, Page } from "@playwright/test";
import { IJSONValue } from "interface/commonInterfaces";

export default class LoginApi {
    readonly page: Page;

    private constructor(page: Page) {
        this.page = page;
    }

    static async login(page: Page, email: string, password: string, retries: number = 3): Promise<void> {
        
        const request: APIRequestContext = page.request;
        const response: APIResponse = await request.post(
            '/users/login',
            {
                data: {
                    email: email,
                    password: password
                }
            }
        );
        const jsonResponse: IJSONValue = await response.json();
        const accessToken = jsonResponse['token'];
    }
}