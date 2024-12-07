import { APIRequestContext, APIResponse, Page } from "@playwright/test";
import { IJSONValue, IPostOptions } from "interface/commonInterfaces";

export default class ContactApi {
    readonly page: Page;
    readonly token: string;

    private constructor(page: Page, token: string) {
        this.page = page;
        this.token = token;
    }

    static async init(page: Page) {
        const context = page.context();
        const state = await context.storageState();
        const token = state.cookies[0].value;
        return new ContactApi(page, token);
    }

    async addContact(payload: IJSONValue): Promise<APIResponse> {
        const request: APIRequestContext = this.page.request;
        const postOptions: IPostOptions = {
            data: payload,
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        };
        const response: APIResponse = await request.post(
            '/contacts',
            postOptions
        );

        return response;
    }

    async editContact(contactId: string, payload: IJSONValue): Promise<APIResponse> {
        const request: APIRequestContext = this.page.request;
        const response: APIResponse = await request.put(
            `/contacts/${contactId}`,
            {
                data: payload,
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            }
        );

        return response;
    }

    async deleteContact(contactId: string): Promise<APIResponse> {
        const request: APIRequestContext = this.page.request;
        const response: APIResponse = await request.delete(
            `/contacts/${contactId}`,
            {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            }
        );

        return response;
    }
}