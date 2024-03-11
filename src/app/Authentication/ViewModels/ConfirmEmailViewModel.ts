import { WritableSignal } from "@angular/core";

export interface ConfirmEmailViewModel {
    success: WritableSignal<boolean>;
    email: WritableSignal<string>;
}