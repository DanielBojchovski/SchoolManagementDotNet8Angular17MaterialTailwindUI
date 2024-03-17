import { GoogleSigninButtonModule, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { LocalStorageAuthTokenName, LocalStorageRefreshTokenName } from '../../../../Consts';
import { GoogleLoginRequest } from '../../Requests/GoogleLoginRequest';
import { AuthService } from '../../Services/auth.service';
import { JwtService } from '../../Services/jwt.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-google-login',
  standalone: true,
  imports: [GoogleSigninButtonModule],
  templateUrl: './google-login.component.html',
  styleUrl: './google-login.component.css'
})
export class GoogleLoginComponent implements OnInit {

  constructor(private socialAuthService: SocialAuthService, private authService: AuthService, private jwtService: JwtService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    localStorage.removeItem(LocalStorageAuthTokenName);
    localStorage.removeItem(LocalStorageRefreshTokenName);
    
    this.socialAuthService.authState.pipe(take(1)).subscribe(x => {
      let request: GoogleLoginRequest = { idToken: x.idToken };
      this.authService.GoogleLogin(request).pipe(take(1)).subscribe(x => {
        if(x.isSuccessful){
          this._snackBar.open("You are logged in!", "Close");
          this.jwtService.saveAuthToken(x.jwtToken!);
          this.jwtService.saveRefreshToken(x.refreshToken!);
        }
      })
    });
  }
  
}
