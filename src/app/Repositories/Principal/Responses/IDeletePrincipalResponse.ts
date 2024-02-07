import { IOperationStatusResponse } from "../../../Common/Responses/IOperationStatusResponse";
import { IGetAllPrincipalsResponse } from "./IGetAllPrincipalsResponse";

export interface IDeletePrincipalResponse{
    getAllPrincipalsResponse: IGetAllPrincipalsResponse;
    operationStatusResponse: IOperationStatusResponse;
}