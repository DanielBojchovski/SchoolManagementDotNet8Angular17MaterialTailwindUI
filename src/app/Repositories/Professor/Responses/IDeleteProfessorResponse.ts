import { IOperationStatusResponse } from "../../../Common/Responses/IOperationStatusResponse";
import { IGetAllProfessorsResponse } from "./IGetAllProfessorsResponse";

export interface IDeleteProfessorResponse{
    getAllProfessorsResponse: IGetAllProfessorsResponse;
    operationStatusResponse: IOperationStatusResponse;
}