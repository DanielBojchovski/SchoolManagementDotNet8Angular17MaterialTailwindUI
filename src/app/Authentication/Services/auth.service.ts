import { Injectable } from '@angular/core';
import { ApiUrl } from '../../../Consts';
import { HttpClient } from '@angular/common/http';
import { RegisterUserRequest } from '../Requests/RegisterUserRequest';
import { IOperationStatusResponse } from '../../Common/Responses/IOperationStatusResponse';
import { Observable } from 'rxjs';
import { ConfirmEmailRequest } from '../Requests/ConfirmEmailRequest';
import { ResendEmailConfirmationRequest } from '../Requests/ResendEmailConfirmationRequest';
import { LoginRequest } from '../Requests/LoginRequest';
import { LoginResponse } from '../Responses/LoginResponse';
import { RefreshTokenRequest } from '../Requests/RefreshTokenRequest';
import { ChangePasswordRequest } from '../Requests/ChangePasswordRequest';
import { ForgotPasswordSendEmailRequest } from '../Requests/ForgotPasswordSendEmailRequest';
import { ResetPasswordRequest } from '../Requests/ResetPasswordRequest';
import { UpdatePermissionRequest } from '../Requests/UpdatePermissionRequest';
import { GetAvailableUsersResponse } from '../Responses/GetAvailableUsersResponse';
import { GetAvailableUsersRequest } from '../Requests/GetAvailableUsersRequest';
import { GoogleLoginRequest } from '../Requests/GoogleLoginRequest';

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

  Login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.authUrl + "Login", request);
  }

  RefreshToken(request: RefreshTokenRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.authUrl + "RefreshToken", request);
  }

  ChangePassword(request: ChangePasswordRequest): Observable<IOperationStatusResponse> {
    return this.http.post<IOperationStatusResponse>(this.authUrl + "ChangePassword", request);
  }

  ForgotPasswordSendEmail(request: ForgotPasswordSendEmailRequest): Observable<IOperationStatusResponse> {
    return this.http.post<IOperationStatusResponse>(this.authUrl + "ForgotPasswordSendEmail", request);
  }

  ResetPassword(request: ResetPasswordRequest): Observable<IOperationStatusResponse> {
    return this.http.post<IOperationStatusResponse>(this.authUrl + "ResetPassword", request);
  }
  
  MakeAdmin(request: UpdatePermissionRequest): Observable<IOperationStatusResponse> {
    return this.http.post<IOperationStatusResponse>(this.authUrl + "MakeAdmin", request);
  }

  GetAvailableUsers(request: GetAvailableUsersRequest): Observable<GetAvailableUsersResponse> {
    return this.http.post<GetAvailableUsersResponse>(this.authUrl + "GetAvailableUsers", request);
  }

  GoogleLogin(request: GoogleLoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.authUrl + "GoogleLogin", request);
  }
}
