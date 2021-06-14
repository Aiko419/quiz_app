import JwtDecode from "jwt-decode";
import { TokenPayload } from "./token-payload";


export class Token implements TokenPayload {
    public token: string;
    public iat: number;
    public exp: number;
    public username: string;

    constructor(tokenPayload: TokenPayload) {
        this.token = tokenPayload.token;
        this.iat = tokenPayload.iat;
        this.exp = tokenPayload.exp;
        this.sub = tokenPayload.sub;
        this.username = tokenPayload.username;
    }
    sub: string;

    public isExpired(): boolean {
        return !this.exp || (this.exp * 1000) < Date.now();
    }

    public static fromJwt(tokenStr: string): Token | null {
        try {
            const tokenPayload = JwtDecode<TokenPayload>(tokenStr);
            tokenPayload.token = tokenStr;
            return new Token(tokenPayload);
        }
        catch {
            console.error('Unable to create token from JWT string:', tokenStr);
            return null;
        }
    }
}
