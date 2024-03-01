import { WritableSignal } from "@angular/core";
import { ISubjectModel } from "../Models/ISubjectModel";

export interface ISubjectViewModel {
    subjects: WritableSignal<ISubjectModel[]>;
    subjectName: WritableSignal<string>;
}