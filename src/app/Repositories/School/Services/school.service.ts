import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from '../../../../Consts';
import { IGetAllSchoolsResponse } from '../Responses/IGetAllSchoolsResponse';
import { Observable } from 'rxjs';
import { IIdRequest } from '../../../Common/Requests/IIdRequest';
import { ISchoolModel } from '../Models/ISchoolModel';
import { ICreateSchoolRequest } from '../Requests/ICreateSchoolRequest';
import { ICreateSchoolResponse } from '../Responses/ICreateSchoolResponse';
import { IUpdateSchoolRequest } from '../Requests/IUpdateSchoolRequest';
import { IUpdateSchoolResponse } from '../Responses/IUpdateSchoolResponse';
import { IDeleteSchoolRequest } from '../Responses/IDeleteSchoolResponse';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private http: HttpClient) { }

  schoolUrl = ApiUrl + "School/";

  GetAllSchools(): Observable<IGetAllSchoolsResponse> {
    return this.http.get<IGetAllSchoolsResponse>(this.schoolUrl + "GetAllSchools");
  }

  GetSchoolById(request: IIdRequest): Observable<ISchoolModel | null> {
    return this.http.post<ISchoolModel | null>(this.schoolUrl + "GetSchoolById", request);
  }

  GetSchoolByPrincipalId(request: IIdRequest): Observable<ISchoolModel | null> {
    return this.http.post<ISchoolModel | null>(this.schoolUrl + "GetSchoolByPrincipalId", request);
  }

  GetSchoolByProfessorId(request: IIdRequest): Observable<ISchoolModel | null> {
    return this.http.post<ISchoolModel | null>(this.schoolUrl + "GetSchoolByProfessorId", request);
  }

  CreateSchool(request: ICreateSchoolRequest): Observable<ICreateSchoolResponse> {
    return this.http.post<ICreateSchoolResponse>(this.schoolUrl + "CreateSchool", request);
  }

  UpdateSchool(request: IUpdateSchoolRequest): Observable<IUpdateSchoolResponse> {
    return this.http.post<IUpdateSchoolResponse>(this.schoolUrl + "UpdateSchool", request);
  }

  DeleteSchool(request: IIdRequest): Observable<IDeleteSchoolRequest> {
    return this.http.post<IDeleteSchoolRequest>(this.schoolUrl + "DeleteSchool", request);
  }
}
