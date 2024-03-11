import { Injectable } from '@angular/core';
import { ApiUrl } from '../../../Consts';
import { HttpClient } from '@angular/common/http';
import { RegisterUserRequest } from '../Requests/RegisterUserRequest';
import { IOperationStatusResponse } from '../../Common/Responses/IOperationStatusResponse';
import { Observable } from 'rxjs';
import { ConfirmEmailRequest } from '../Requests/ConfirmEmailRequest';
import { ResendEmailConfirmationRequest } from '../Requests/ResendEmailConfirmationRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  authUrl = ApiUrl + "Auth/";

  Register(request: RegisterUserRequest): Observable<IOperationStatusResponse> {
    return this.http.post<IOperationStatusResponse>(this.authUrl + "Register", request);
  }

  ConfirmEmail(request: ConfirmEmailRequest): Observable<IOperationStatusResponse> {
    return this.http.post<IOperationStatusResponse>(this.authUrl + "ConfirmEmail", request);
  }

  ResendEmailConfirmation(request: ResendEmailConfirmationRequest): Observable<IOperationStatusResponse> {
    return this.http.post<IOperationStatusResponse>(this.authUrl + "ResendEmailConfirmation", request);
  }
}
