import { IOperationStatusResponse } from "../../../Common/Responses/IOperationStatusResponse";
import { IGetAllSchoolsResponse } from "./IGetAllSchoolsResponse";

export interface IUpdateSchoolResponse{
    getAllSchoolsResponse: IGetAllSchoolsResponse;
    operationStatusResponse: IOperationStatusResponse;
}