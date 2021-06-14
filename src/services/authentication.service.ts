import { WebService } from './abstract-web.service';
import { ApiResultPromise } from './api.result';
import { Token } from '../models/token';
import { TokenPayload } from '../models/token-payload';

export class AuthenticationService extends WebService {
    constructor() {
        super();
    }

    public login(username: string, password: string): ApiResultPromise<string> {
        //return this.post('api/auth/login', { username, password });
        return new Promise(() => {
            return {
                successful: false,
                code: 200,
                reason: "Default login",
                data: "Test"
            };
        });
    }

    public getUserId() : ApiResultPromise<number> {
        //return this.get('api/auth/userId');
        return new Promise(() => {
            return {
                successful: false,
                code: 200,
                reason: "Default login",
                data: 1
            };
        });
    }

    private static token: string | undefined;
    private static LS_TOKEN_KEY = 'token';

    public static saveToken(token: TokenPayload | null): void {
        if (token) {
            window.localStorage.setItem(AuthenticationService.LS_TOKEN_KEY, token.token);
            AuthenticationService.token = token.token;
        }
        else {
            window.localStorage.removeItem(AuthenticationService.LS_TOKEN_KEY);
            AuthenticationService.token = undefined;
        }
    }

    public static getToken(): Token | null {
        if (!AuthenticationService.token) {
            AuthenticationService.token = window.localStorage.getItem(AuthenticationService.LS_TOKEN_KEY) || undefined;
            if (!AuthenticationService.token) {
                return null;
            }
        }

        return Token.fromJwt(AuthenticationService.token);
    }
}