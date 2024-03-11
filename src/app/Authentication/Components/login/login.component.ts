import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginViewModel } from '../../ViewModels/LoginViewModel';
import { LocalStorageAuthTokenName } from '../../../../Consts';
import { LoginRequest } from '../../Requests/LoginRequest';
import { take } from 'rxjs';
import { JwtService } from '../../Services/jwt.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private _snackBar: MatSnackBar, private router: Router, private jwtService: JwtService) {}

  viewModel: LoginViewModel = {email: signal(""), password: signal("")};

  ngOnInit(): void {
    localStorage.removeItem(LocalStorageAuthTokenName);
  }

  Login(){
    if(this.viewModel.email().trim() === "" || this.viewModel.password().trim() === ""){
      this._snackBar.open("All fields are required!", "Close");
      return;
    }

    if(this.viewModel.password().trim().length < 6){
      this._snackBar.open("Password must have at least 6 characters!", "Close");
      return;
    }

    let request: LoginRequest = {
      email: this.viewModel.email(),
      password: this.viewModel.password()
    }

    this.authService.Login(request).pipe(take(1)).subscribe(x => {
      if(x.isSuccessful){
        this._snackBar.open("You are logged in!", "Close");
        this.jwtService.saveAuthToken(x.jwtToken);
        let state = this.router.lastSuccessfulNavigation?.extras.state;
        if (state) {
          this.router.navigate([state['returnUrl']]);
        }
        else {
          this.router.navigate(["/"]);
        }
      }
      else{
        this._snackBar.open("Invalid credentials!", "Close");
      }
    })
  }
}
