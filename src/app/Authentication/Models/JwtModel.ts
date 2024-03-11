export interface JwtModel {
    name: string;
    sub: string;
    email: string;
    roles: string[];
    exp: number;
    iss: string;
    aud: string;
}