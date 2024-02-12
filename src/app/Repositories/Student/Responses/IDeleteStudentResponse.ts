import { IOperationStatusResponse } from "../../../Common/Responses/IOperationStatusResponse";
import { IGetAllStudentsResponse } from "./IGetAllStudentsResponse";

export interface IDeleteStudentResponse{
    getAllStudentsResponse: IGetAllStudentsResponse;
    operationStatusResponse: IOperationStatusResponse;
}