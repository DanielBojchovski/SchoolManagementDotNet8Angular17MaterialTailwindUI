import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from '../../../../Consts';
import { Observable } from 'rxjs';
import { IGetAllSubjectsResponse } from '../Responses/IGetAllSubjectsResponse';
import { IIdRequest } from '../../../Common/Requests/IIdRequest';
import { ISubjectModel } from '../Models/ISubjectModel';
import { ICreateSubjectRequest } from '../Requests/ICreateSubjectRequest';
import { ICreateSubjectResponse } from '../Responses/ICreateSubjectResponse';
import { IUpdateSubjectRequest } from '../Requests/IUpdateSubjectRequest';
import { IUpdateSubjectResponse } from '../Responses/IUpdateSubjectResponse';
import { IDeleteSubjectResponse } from '../Responses/IDeleteSubjectResponse';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

  subjectUrl = ApiUrl + "Subject/";

  GetAllSubjects(): Observable<IGetAllSubjectsResponse> {
    return this.http.get<IGetAllSubjectsResponse>(this.subjectUrl + "GetAllSubjects");
  }

  GetSubjectById(request: IIdRequest): Observable<ISubjectModel | null> {
    return this.http.post<ISubjectModel | null>(this.subjectUrl + "GetSubjectById", request);
  }

  CreateSubject(request: ICreateSubjectRequest): Observable<ICreateSubjectResponse> {
    return this.http.post<ICreateSubjectResponse>(this.subjectUrl + "CreateSubject", request);
  }

  UpdateSubject(request: IUpdateSubjectRequest): Observable<IUpdateSubjectResponse> {
    return this.http.post<IUpdateSubjectResponse>(this.subjectUrl + "UpdateSubject", request);
  }

  DeleteSubject(request: IIdRequest): Observable<IDeleteSubjectResponse> {
    return this.http.post<IDeleteSubjectResponse>(this.subjectUrl + "DeleteSubject", request);
  }
}
