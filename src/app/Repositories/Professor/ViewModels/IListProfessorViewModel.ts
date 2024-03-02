import { WritableSignal } from "@angular/core";
import { IProfessorModel } from "../Models/IProfessorModel";

export interface IListProfessorViewModel {
    professors: WritableSignal<IProfessorModel[]>;
}