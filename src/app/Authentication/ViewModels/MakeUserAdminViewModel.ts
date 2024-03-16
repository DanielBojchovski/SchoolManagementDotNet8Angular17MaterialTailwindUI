import { WritableSignal } from "@angular/core";
import { UserDropDownModel } from "../Models/UserDropDownModel";
import { JwtModel } from "../Models/JwtModel";

export interface MakeUserAdminViewModel {
    id: WritableSignal<string>;
    users: WritableSignal<UserDropDownModel[]>;
    token: WritableSignal<JwtModel | null>;
}