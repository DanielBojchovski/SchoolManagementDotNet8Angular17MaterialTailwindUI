import { WritableSignal } from "@angular/core";

export interface LoginViewModel {
    email: WritableSignal<string>;
    password: WritableSignal<string>;
}