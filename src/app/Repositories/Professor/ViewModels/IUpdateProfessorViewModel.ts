import { WritableSignal } from "@angular/core";
import { IDropDownItem } from "../../../Common/Models/IDropDownItem";

export interface IUpdateProfessorViewModel {
    id: WritableSignal<number>;
    name: WritableSignal<string>;
    schoolId: WritableSignal<number>;
    schoolOptions: WritableSignal<IDropDownItem[]>;
}