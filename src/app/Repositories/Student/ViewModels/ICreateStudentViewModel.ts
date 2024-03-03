import { WritableSignal } from "@angular/core";
import { ISubjectDto } from "../../Subject/Models/ISubjectDto";
import { ISubjectInfo } from "../../Subject/Models/ISubjectInfo";

export interface ICreateStudentViewModel{
    name: WritableSignal<string>;
    selectedSubjects: WritableSignal<ISubjectInfo[]>;
    subjectOptions: WritableSignal<ISubjectDto[]>;
}