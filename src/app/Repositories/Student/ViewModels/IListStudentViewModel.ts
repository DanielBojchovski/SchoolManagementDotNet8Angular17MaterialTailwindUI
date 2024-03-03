import { WritableSignal } from "@angular/core";
import { IStudentModel } from "../Models/IStudentModel";

export interface IListStudentViewModel{
    students: WritableSignal<IStudentModel[]>;
}