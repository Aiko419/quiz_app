import { createSlice } from '@reduxjs/toolkit';
import { ApiResult } from '../services/api.result';
import { NotificationService } from '../services/notification.service';
//import { logout } from './authentication.state';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ErrorState {
}

const initialState: ErrorState = {};

// eslint-disable-next-line @typescript-eslint/no-empty-function
function apiErrorReducer() { }

const { reducer } = createSlice({
    name: 'error',
    initialState,
    reducers: {
        apiError: apiErrorReducer,
    },
});

export { reducer as ErrorReducer };

export const apiError = (result: ApiResult<any>) => async dispatch => {
    console.error(`API Error ${result.code}: ${result.reason}`);
    if (result.code === 401) {
        
    }
    if (result.code === 403 && result.reason) {
        // 'User does not have access to the resource requested:',
        NotificationService.error(result.reason);
    }
    if (result.code === 500) {
        NotificationService.error('A server error occurred:', result.reason || 'No reason provided');
    }
};
