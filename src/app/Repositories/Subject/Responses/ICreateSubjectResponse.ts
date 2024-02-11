import { IOperationStatusResponse } from "../../../Common/Responses/IOperationStatusResponse";
import { IGetAllSubjectsResponse } from "./IGetAllSubjectsResponse";

export interface ICreateSubjectResponse{
    getAllSubjectsResponse: IGetAllSubjectsResponse;
    operationStatusResponse: IOperationStatusResponse;
}