import { Component, signal } from '@angular/core';
import { RegisterViewModel } from '../../ViewModels/RegisterViewModel';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { RegisterUserRequest } from '../../Requests/RegisterUserRequest';
import { take } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private authService: AuthService, private _snackBar: MatSnackBar, private router: Router) {}

  viewModel: RegisterViewModel = {firstName: signal(""), lastName: signal(""), userName: signal(""), email: signal(""), password: signal("")}

  Register(){
    if(this.viewModel.firstName().trim() === "" || this.viewModel.lastName().trim() === "" || this.viewModel.userName().trim() === "" || this.viewModel.email().trim() === "" || this.viewModel.password().trim() === ""){
      this._snackBar.open("All fields are required!", "Close");
      return;
    }

    if(this.viewModel.password().trim().length < 6){
      this._snackBar.open("Password must have at least 6 characters!", "Close");
      return;
    }

    let request: RegisterUserRequest = {
      firstName: this.viewModel.firstName(),
      lastName: this.viewModel.lastName(),
      userName: this.viewModel.userName(),
      email: this.viewModel.email(),
      password: this.viewModel.password()
    }

    this.authService.Register(request).pipe(take(1)).subscribe(x => {
      if(x.isSuccessful){
        this._snackBar.open(`Email was sent to ${request.email} where you can confirm your account!`, "Close");
        this.router.navigate(['']);
      }
    })
  }
}
