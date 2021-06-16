import { WebService } from '../services/abstract-web.service';
import { ApiResult } from '../services/api.result';
import { apiError } from './error.state';

type DispatchType = (action: any) => void;
type ActionType = ((dispatch: DispatchType) => any);

export const createSecuredAsyncAction = (action: ActionType) => (async (dispatch: DispatchType) => {
    return action(dispatch);
});

export const checkResult = (res: ApiResult<any>, dispatch: any) => {
    if (!res.successful) {
        dispatch(apiError(res));
        return false;
    }
    return true;
};

export const extractData = <T>(res: ApiResult<T>, dispatch: any) => {
    if (checkResult(res, dispatch)) {
        return res.data;
    }
    return undefined;
};

export const requestIsSuccess = async <T>(service: WebService, request: Promise<T>): Promise<boolean> => {
    try {
        await request;
        return true;
    } catch {
        return false;
    }
};
