import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { ForgotPasswordViewModel } from '../../ViewModels/ForgotPasswordViewModel';
import { ResetPasswordRequest } from '../../Requests/ResetPasswordRequest';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute, private _snackBar: MatSnackBar) {}

  viewModel: ForgotPasswordViewModel = {token: signal(""), email: signal(""), newPassword: signal("")};

  ngOnInit(): void {
    this.activatedRoute.paramMap
    .pipe(take(1)).subscribe({
      next: (params) =>{
        this.viewModel.token.set(params.get('token')!);
        this.viewModel.email.set(params.get('email')!);
      }
    })
  }

  ResetPassword(){
    if(this.viewModel.newPassword().trim() === "" || this.viewModel.newPassword().trim().length < 6){
      this._snackBar.open("Invalid password!", "Close");
      return;
    }

    let request: ResetPasswordRequest = {token: this.viewModel.token(), email: this.viewModel.email(), newPassword: this.viewModel.newPassword()};

    this.authService.ResetPassword(request).pipe(take(1)).subscribe(x => {
      if(x.isSuccessful){
        this._snackBar.open("Successfully restored password!", "Close");
        this.router.navigate(["account/login"]);
      }
      else{
        this._snackBar.open("Somthing went wrong!", "Close");
      }
    })
  }
}
