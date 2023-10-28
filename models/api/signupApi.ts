import { APIRequestContext, APIResponse, Page } from "@playwright/test";
import { IJSONValue, IPostOptions } from "interface/commonInterfaces";

export default class SignupApi {
    readonly page: Page;

    static async signup(page: Page, payload: IJSONValue, retries: number = 3): Promise<APIResponse> {
        
        if (retries < 1) {
            throw new Error('Failed to signup');
        }
        
        const request: APIRequestContext = page.request;
        const postOptions: IPostOptions = {
            data: payload
        }

        try {
            const response: APIResponse = await request.post(
                '/users',
                postOptions
            );
            
            return response;
        } catch (error) {
            await this.signup(page, payload, retries - 1);
        }
    }
}