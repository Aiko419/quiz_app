export interface TokenPayload {
    token: string;
    iat: number; // issued at time
    exp: number; // expires
    sub: string; // identity
    username: string;
}