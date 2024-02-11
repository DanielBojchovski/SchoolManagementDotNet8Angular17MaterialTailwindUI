import { IStudentDto } from "../../Student/Models/IStudentDto";

export interface ISubjectModel{
    id: number;
    name: string;
    students: IStudentDto[];
}