export interface LoginResponse {
    isSuccessful: boolean;
    message: string;
    jwtToken: string;
}