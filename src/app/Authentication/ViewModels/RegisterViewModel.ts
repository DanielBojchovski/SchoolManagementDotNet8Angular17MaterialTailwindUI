import { WritableSignal } from "@angular/core";

export interface RegisterViewModel {
    firstName: WritableSignal<string>;
    lastName: WritableSignal<string>;
    userName: WritableSignal<string>;
    email: WritableSignal<string>;
    password: WritableSignal<string>;
}