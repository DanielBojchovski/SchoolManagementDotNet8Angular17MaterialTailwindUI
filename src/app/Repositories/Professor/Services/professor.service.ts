import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from '../../../../Consts';
import { IGetAllProfessorsResponse } from '../Responses/IGetAllProfessorsResponse';
import { Observable } from 'rxjs';
import { IIdRequest } from '../../../Common/Requests/IIdRequest';
import { IProfessorModel } from '../Models/IProfessorModel';
import { ICreateProfessorRequest } from '../Requests/ICreateProfessorRequest';
import { IOperationStatusResponse } from '../../../Common/Responses/IOperationStatusResponse';
import { IUpdatePrincipalRequest } from '../../Principal/Requests/IUpdatePrincipalRequest';
import { IDeleteProfessorResponse } from '../Responses/IDeleteProfessorResponse';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  constructor(private http: HttpClient) { }

  professorUrl = ApiUrl + "Professor/";

  GetAllProfessors(): Observable<IGetAllProfessorsResponse>{
    return this.http.get<IGetAllProfessorsResponse>(this.professorUrl + "GetAllProfessors");
  }

  GetProfessorById(request: IIdRequest): Observable<IProfessorModel | null> {
    return this.http.post<IProfessorModel | null>(this.professorUrl + "GetProfessorById", request);
  }

  GetProfessorsBySchoolId(request: IIdRequest): Observable<IGetAllProfessorsResponse>{
    return this.http.post<IGetAllProfessorsResponse>(this.professorUrl + "GetProfessorsBySchoolId", request);
  }

  CreateProfessor(request: ICreateProfessorRequest): Observable<IOperationStatusResponse>{
    return this.http.post<IOperationStatusResponse>(this.professorUrl + "CreateProfessor", request);
  }

  UpdateProfessor(request: IUpdatePrincipalRequest): Observable<IOperationStatusResponse>{
    return this.http.post<IOperationStatusResponse>(this.professorUrl + "UpdateProfessor", request);
  }

  DeleteProfessor(request: IIdRequest): Observable<IDeleteProfessorResponse>{
    return this.http.post<IDeleteProfessorResponse>(this.professorUrl + "DeleteProfessor", request);
  }
}
