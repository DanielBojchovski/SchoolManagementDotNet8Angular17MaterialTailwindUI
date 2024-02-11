import { IDropDownItem } from "../../../Common/Models/IDropDownItem";
import { IProfessorDto } from "../Models/IProfessorDto";

export interface IInitUpdateProfessorResponse{
    professor: IProfessorDto;
    schoolOptions: IDropDownItem[];
}