import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { JwtService } from '../Authentication/Services/jwt.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { RefreshTokenRequest } from '../Authentication/Requests/RefreshTokenRequest';
import { AuthService } from '../Authentication/Services/auth.service';
import { Router } from '@angular/router';
import { LocalStorageAuthTokenName, LocalStorageRefreshTokenName } from '../../Consts';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const jwtService = inject(JwtService);
  const authService = inject(AuthService);
  const router = inject(Router)

  if(jwtService.isLoggedIn()){
    req = req.clone({
      headers: req.headers.set('Authorization', jwtService.getBearerToken()!)
    });
  }

  return next(req).pipe(
    catchError((err:any)=>{
      if(err instanceof HttpErrorResponse){
        if(err.status === 401){
          let refreshTokenRequest: RefreshTokenRequest = {
            token: jwtService.getAuthToken()!,
            refreshToken: jwtService.getRefreshToken()!
          }
          return authService.RefreshToken(refreshTokenRequest).pipe(
            switchMap((data) => {
              jwtService.saveAuthToken(data.jwtToken!);
              jwtService.saveRefreshToken(data.refreshToken!);
              req = req.clone({
                headers: req.headers.set('Authorization', jwtService.getBearerToken()!)  
              });
              return next(req);
            }),
            catchError((err)=>{
              return throwError(()=>{
                localStorage.removeItem(LocalStorageAuthTokenName);
                localStorage.removeItem(LocalStorageRefreshTokenName);
                router.navigate(['account/login']);
              })
            })
          )
        }
      }
      return throwError(()=> err)
    })
  );
};


