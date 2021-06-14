import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiResult } from "./api.result";

interface Header {
    name: string;
    value?: string;
    delegate?: () => string | null;
}

export abstract class WebService {
    protected rootUrl = '';
    protected client: AxiosInstance;
    private headers: Header[] = [];

    constructor() {
        this.rootUrl = 'http://react14-contest-easy-quiz-app.herokuapp.com/';
        this.client = axios.create();
        this.client.interceptors.request.use((config) => this.setHeaders(config));
    }

    protected async get<T = unknown>(url: string): Promise<ApiResult<T>> {
        const req = this.client.get<ApiResult<T>>(url);
        return this.wrap('get', url, req);
    }

    protected async post<T = unknown>(url: string, data?: unknown): Promise<ApiResult<T>> {
        const req = this.client.post<ApiResult<T>>(url, data);
        return this.wrap('post', url, req);
    }

    private async wrap<T>(verb: string, url: string, call: Promise<AxiosResponse<ApiResult<T>>>): Promise<ApiResult<T>> {
        verb = verb.toUpperCase();
        try {
            const res = await call;
            const apiResult = res.data;
            if (res.status === 200 && apiResult.successful === undefined) {
                throw new Error(`An API call expects API response with the 'successful' property.\nCall was:\n\t'${verb} ${url}'\nGot:\n\t${JSON.stringify(apiResult)}`);
            }
            if (!apiResult.successful) {
                const message = `${verb} ${url} - Not successful; ${apiResult.reason}`;
                console.warn(message);
            }
            return apiResult;
        }
        catch (err) {
            const res = err.response;
            const code = res && res.status;
            const data = res && res.data;
            let reason = (data && data.reason) || err.message;
            if ( code === 500 && typeof data === 'string') {
                reason = data;
            }

            console.error(`[${verb} ${url}] ${reason}`);
            return {
                successful: false,
                code,
                reason,
            };
        }
    }

    protected addHeader(name: string, value: string): void {
        if (this.isHeaderAlreadyAdded(name)) {
            console.warn(`WebService.addHeader: Duplicate header name ${name}`);
            return;
        }
        this.headers.push({ name, value });
    }

    protected addDynamicHeader(name: string, delegate: () => string | null): void {
        if (this.isHeaderAlreadyAdded(name)) {
            console.warn(`WebService.addDynamicHeader: Duplicate header name ${name}`);
            return;
        }
        this.headers.push({ name, delegate });
    }

    private isHeaderAlreadyAdded(name: string): boolean {
        return this.headers.find((h) => h.name === name) !== undefined;
    }

    protected setHeaders(config: AxiosRequestConfig): AxiosRequestConfig {
        for (const header of this.headers) {
            const name = header.name;
            const value = header.value || (header.delegate && header.delegate());
            if (value === null) {
                console.debug(`WebService.setHeaders: Skipping header '${name}' since value is null`);
                continue;
            }
            config.headers[name] = value;
        }
        return config;
    }
}