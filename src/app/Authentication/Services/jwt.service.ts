import { Injectable } from '@angular/core';
import { JwtModel } from '../Models/JwtModel';
import { LocalStorageAuthTokenName, LocalStorageRefreshTokenName } from '../../../Consts';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  public isLoggedIn() {
    const token = this.getAuthToken();

    if (token === null || token === undefined)
      return false;

    return true;
  }

  public saveAuthToken(authToken: string): void {
    localStorage.setItem(LocalStorageAuthTokenName, authToken);
  }

  public saveRefreshToken(refreshToken: string): void {
    localStorage.setItem(LocalStorageRefreshTokenName, refreshToken);
  }

  public getAuthToken(): string | null {
    return localStorage.getItem(LocalStorageAuthTokenName);
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem(LocalStorageRefreshTokenName);
  }

  public getBearerToken(): string | null {
    return "Bearer " + localStorage.getItem(LocalStorageAuthTokenName);
  }

  public decodeToken(): JwtModel | null {
    let token = localStorage.getItem(LocalStorageAuthTokenName);

    if (token !== null) {
      let decodedToken: JwtModel | null = jwtDecode(token);
      return decodedToken;
    }
    return null;
  }
}
