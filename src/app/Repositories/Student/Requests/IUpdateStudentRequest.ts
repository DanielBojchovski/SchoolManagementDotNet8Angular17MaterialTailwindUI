import { ISubjectInfo } from "../../Subject/Models/ISubjectInfo";

export interface IUpdateStudentRequest{
    id: number;
    name: string;
    subjects: ISubjectInfo[];
}