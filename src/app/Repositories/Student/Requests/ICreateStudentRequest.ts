import { ISubjectInfo } from "../../Subject/Models/ISubjectInfo";

export interface ICreateStudentRequest{
    name: string;
    subjects: ISubjectInfo[];
}