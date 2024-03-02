import { WritableSignal } from "@angular/core";
import { IDropDownItem } from "../../../Common/Models/IDropDownItem";

export interface ICreatePrincipalViewModel {
    name: WritableSignal<string>;
    schoolId: WritableSignal<number>;
    schoolOptions: WritableSignal<IDropDownItem[]>;
}