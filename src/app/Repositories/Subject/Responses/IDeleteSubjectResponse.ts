import { IOperationStatusResponse } from "../../../Common/Responses/IOperationStatusResponse";
import { IGetAllSubjectsResponse } from "./IGetAllSubjectsResponse";

export interface IDeleteSubjectResponse{
    getAllSubjectsResponse: IGetAllSubjectsResponse;
    operationStatusResponse: IOperationStatusResponse;
}