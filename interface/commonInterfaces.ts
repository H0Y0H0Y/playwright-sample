export interface IJSONValue {
    [x: string]: string | number | boolean | null | IJSONValue | Buffer | IJSONValue[] | string[] | Buffer[];
}

export interface IPostOptions extends IJSONValue {
    data?: IJSONValue;
    headers?: {
        [key: string]: string;
    };
}