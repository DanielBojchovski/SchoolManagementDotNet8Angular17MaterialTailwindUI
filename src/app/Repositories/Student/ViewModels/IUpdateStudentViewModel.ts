import { WritableSignal } from "@angular/core";
import { IStudentModel } from "../Models/IStudentModel";
import { ISubjectInfo } from "../../Subject/Models/ISubjectInfo";

export interface IUpdateStudentViewModel {
    student: WritableSignal<IStudentModel | null>;
    subjects: WritableSignal<ISubjectInfo[]>;
}