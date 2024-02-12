import { IOperationStatusResponse } from "../../../Common/Responses/IOperationStatusResponse";
import { IGetAllStudentsResponse } from "./IGetAllStudentsResponse";

export interface ISetNewMajorForStudentResponse{
    getAllStudentsResponse: IGetAllStudentsResponse;
    operationStatusResponse: IOperationStatusResponse;
}