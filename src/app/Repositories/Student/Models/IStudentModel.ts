import { ISubjectDto } from "../../Subject/Models/ISubjectDto";

export interface IStudentModel{
    id: number;
    name: string;
    subjects: ISubjectDto[];
}