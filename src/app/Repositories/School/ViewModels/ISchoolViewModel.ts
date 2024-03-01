import { WritableSignal } from "@angular/core";
import { ISchoolModel } from "../Models/ISchoolModel";

export interface ISchoolViewModel {
    schools: WritableSignal<ISchoolModel[]>;
    schoolName: WritableSignal<string>;
}