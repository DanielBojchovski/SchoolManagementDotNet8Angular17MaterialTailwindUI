import { Component, signal } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ChangePasswordViewModel } from '../../ViewModels/ChangePasswordViewModel';
import { FormsModule } from '@angular/forms';
import { ChangePasswordRequest } from '../../Requests/ChangePasswordRequest';
import { take } from 'rxjs';
import { LocalStorageAuthTokenName, LocalStorageRefreshTokenName } from '../../../../Consts';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {

  constructor(private authService: AuthService, private _snackBar: MatSnackBar, private router: Router) {}

  viewModel: ChangePasswordViewModel = {email: signal(""), currentPassword: signal(""), newPassword: signal(""), confirmNewPassword: signal("")};

  ChangePassword(){
    if(this.viewModel.email().trim() === "" || this.viewModel.currentPassword().trim() === "" || this.viewModel.newPassword().trim() === "" || this.viewModel.confirmNewPassword().trim() === ""){
      this._snackBar.open("All fields are required!", "Close");
      return;
    }

    if(this.viewModel.newPassword().trim() !== this.viewModel.confirmNewPassword().trim()){
      this._snackBar.open("New passwords mismatch!", "Close");
      return;
    }

    if(this.viewModel.newPassword().trim().length < 6){
      this._snackBar.open("New password must have at least 6 characters!", "Close");
      return;
    }

    let request: ChangePasswordRequest = {
      email: this.viewModel.email(),
      currentPassword: this.viewModel.currentPassword(),
      newPassword: this.viewModel.newPassword(),
      confirmNewPassword: this.viewModel.confirmNewPassword()
    }

    this.authService.ChangePassword(request).pipe(take(1)).subscribe(x => {
      if(x.isSuccessful){
        this._snackBar.open("Successfully changed password!", "Close");
        localStorage.removeItem(LocalStorageAuthTokenName);
        localStorage.removeItem(LocalStorageRefreshTokenName);
        this.router.navigate(["/"]);
      }
      else{
        this._snackBar.open("Error changing pass!", "Close");
      }
    })
  }
}
