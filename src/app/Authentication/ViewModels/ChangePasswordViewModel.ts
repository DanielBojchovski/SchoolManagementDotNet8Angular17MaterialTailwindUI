import { WritableSignal } from "@angular/core";

export interface ChangePasswordViewModel{
    email: WritableSignal<string>;
    currentPassword: WritableSignal<string>;
    newPassword: WritableSignal<string>;
    confirmNewPassword: WritableSignal<string>;
}