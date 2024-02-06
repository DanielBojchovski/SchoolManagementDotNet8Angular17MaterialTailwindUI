import { IOperationStatusResponse } from "../../../Common/Responses/IOperationStatusResponse";
import { IGetAllSchoolsResponse } from "./IGetAllSchoolsResponse";

export interface ICreateSchoolResponse{
    getAllSchoolsResponse: IGetAllSchoolsResponse;
    operationStatusResponse: IOperationStatusResponse;
}