import { IOperationStatusResponse } from "../../../Common/Responses/IOperationStatusResponse";
import { IGetAllSchoolsResponse } from "./IGetAllSchoolsResponse";

export interface IDeleteSchoolRequest{
    getAllSchoolsResponse: IGetAllSchoolsResponse;
    operationStatusResponse: IOperationStatusResponse;
}