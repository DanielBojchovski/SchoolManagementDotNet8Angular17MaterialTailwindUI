import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from '../../../../Consts';
import { IGetAllStudentsResponse } from '../Responses/IGetAllStudentsResponse';
import { Observable } from 'rxjs';
import { IIdRequest } from '../../../Common/Requests/IIdRequest';
import { IStudentModel } from '../Models/IStudentModel';
import { IGetStudentWithHisMajorResponse } from '../Responses/IGetStudentWithHisMajorResponse';
import { ISetNewMajorForStudentRequest } from '../Requests/ISetNewMajorForStudentRequest';
import { IOperationStatusResponse } from '../../../Common/Responses/IOperationStatusResponse';
import { ICreateStudentRequest } from '../Requests/ICreateStudentRequest';
import { IUpdateStudentRequest } from '../Requests/IUpdateStudentRequest';
import { IDeleteStudentResponse } from '../Responses/IDeleteStudentResponse';
import { ISetNewMajorForStudentResponse } from '../Responses/ISetNewMajorForStudentResponse';
import { IGetAvailableSubjectsResponse } from '../Responses/IGetAvailableSubjectsResponse';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  studentUrl = ApiUrl + "Student/";

  GetAllStudents(): Observable<IGetAllStudentsResponse> {
    return this.http.get<IGetAllStudentsResponse>(this.studentUrl + "GetAllStudents");
  }

  GetStudentById(request: IIdRequest): Observable<IStudentModel | null> {
    return this.http.post<IStudentModel | null>(this.studentUrl + "GetStudentById", request);
  }

  GetStudentWithHisMajor(request: IIdRequest): Observable<IGetStudentWithHisMajorResponse> {
    return this.http.post<IGetStudentWithHisMajorResponse>(this.studentUrl + "GetStudentWithHisMajor", request);
  }

  SetNewMajorForStudent(request: ISetNewMajorForStudentRequest): Observable<ISetNewMajorForStudentResponse> {
    return this.http.post<ISetNewMajorForStudentResponse>(this.studentUrl + "SetNewMajorForStudent", request);
  }

  CreateStudent(request: ICreateStudentRequest): Observable<IOperationStatusResponse>{
    return this.http.post<IOperationStatusResponse>(this.studentUrl + "CreateStudent", request);
  }

  UpdateStudent(request: IUpdateStudentRequest): Observable<IOperationStatusResponse>{
    return this.http.post<IOperationStatusResponse>(this.studentUrl + "UpdateStudent", request);
  }

  DeleteStudent(request: IIdRequest): Observable<IDeleteStudentResponse>{
    return this.http.post<IDeleteStudentResponse>(this.studentUrl + "DeleteStudent", request);
  }

  GetAvailableSubjects(): Observable<IGetAvailableSubjectsResponse> {
    return this.http.get<IGetAvailableSubjectsResponse>(this.studentUrl + "GetAvailableSubjects");
  }
}
