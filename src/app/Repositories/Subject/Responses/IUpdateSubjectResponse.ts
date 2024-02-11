import { IOperationStatusResponse } from "../../../Common/Responses/IOperationStatusResponse";
import { IGetAllSubjectsResponse } from "./IGetAllSubjectsResponse";

export interface IUpdateSubjectResponse{
    getAllSubjectsResponse: IGetAllSubjectsResponse;
    operationStatusResponse: IOperationStatusResponse;
}