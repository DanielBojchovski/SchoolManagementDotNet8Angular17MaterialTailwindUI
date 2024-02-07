import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from '../../../../Consts';
import { Observable } from 'rxjs';
import { IGetAllPrincipalsResponse } from '../Responses/IGetAllPrincipalsResponse';
import { IIdRequest } from '../../../Common/Requests/IIdRequest';
import { IPrincipalModel } from '../Models/IPrincipalModel';
import { ICreatePrincipalRequest } from '../Requests/ICreatePrincipalRequest';
import { IOperationStatusResponse } from '../../../Common/Responses/IOperationStatusResponse';
import { IUpdatePrincipalRequest } from '../Requests/IUpdatePrincipalRequest';
import { IDeletePrincipalResponse } from '../Responses/IDeletePrincipalResponse';

@Injectable({
  providedIn: 'root'
})
export class PrincipalService {

  constructor(private http: HttpClient) { }

  principalUrl = ApiUrl + "Principal/";

  GetAllPrincipals(): Observable<IGetAllPrincipalsResponse>{
    return this.http.get<IGetAllPrincipalsResponse>(this.principalUrl + "GetAllPrincipals");
  }

  GetPrincipalById(request: IIdRequest): Observable<IPrincipalModel | null> {
    return this.http.post<IPrincipalModel | null>(this.principalUrl + "GetPrincipalById", request);
  }

  GetPrincipalBySchoolId(request: IIdRequest): Observable<IPrincipalModel | null> {
    return this.http.post<IPrincipalModel | null>(this.principalUrl + "GetPrincipalBySchoolId", request);
  }

  CreatePrincipal(request: ICreatePrincipalRequest): Observable<IOperationStatusResponse> {
    return this.http.post<IOperationStatusResponse>(this.principalUrl + "CreatePrincipal", request);
  }

  UpdatePrincipal(request: IUpdatePrincipalRequest): Observable<IOperationStatusResponse> {
    return this.http.post<IOperationStatusResponse>(this.principalUrl + "UpdatePrincipal", request);
  }

  DeletePrincipal(request: IIdRequest): Observable<IDeletePrincipalResponse> {
    return this.http.post<IDeletePrincipalResponse>(this.principalUrl + "DeletePrincipal", request);
  }
}
