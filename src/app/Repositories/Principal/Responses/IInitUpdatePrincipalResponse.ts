import { IDropDownItem } from "../../../Common/Models/IDropDownItem";
import { IPrincipalDto } from "../Models/IPrincipalDto";

export interface IInitUpdatePrincipalResponse{
    principal: IPrincipalDto;
    schoolOptions: IDropDownItem[]
}