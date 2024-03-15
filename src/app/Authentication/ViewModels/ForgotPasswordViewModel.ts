import { WritableSignal } from "@angular/core";

export interface ForgotPasswordViewModel {
    token: WritableSignal<string>;
    email: WritableSignal<string>;
    newPassword: WritableSignal<string>;
}