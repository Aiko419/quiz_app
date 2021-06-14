export interface ApiResult<T> { // from Api.Common.ApiResult.cs
    successful: boolean;
    reason?: string;
    code?: number;
    data?: T;
}

export type ApiResultPromise<T> = Promise<ApiResult<T>>