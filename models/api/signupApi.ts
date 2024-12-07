import { APIRequestContext, APIResponse, Page } from "@playwright/test";
import { IJSONValue, IPostOptions } from "interface/commonInterfaces";

export default class SignupApi {
    readonly page: Page;

    static async signup(page: Page, payload: IJSONValue): Promise<APIResponse> {
        
        const request: APIRequestContext = page.request;
        const postOptions: IPostOptions = {
            data: payload
        };
        const response: APIResponse = await request.post(
            '/users',
            postOptions
        );
        
        return response;
    }
}