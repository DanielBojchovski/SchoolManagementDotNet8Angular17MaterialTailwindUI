import { Component, OnInit, signal } from '@angular/core';
import { ConfirmEmailViewModel } from '../../ViewModels/ConfirmEmailViewModel';
import { AuthService } from '../../Services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { ConfirmEmailRequest } from '../../Requests/ConfirmEmailRequest';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResendEmailConfirmationRequest } from '../../Requests/ResendEmailConfirmationRequest';

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.css'
})
export class ConfirmEmailComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute, private _snackBar: MatSnackBar) {}

  viewModel: ConfirmEmailViewModel = {success: signal(false), email: signal("")};

  ngOnInit(): void {
    this.activatedRoute.paramMap
    .pipe(take(1)).subscribe({
      next: (params) =>{
        this.viewModel.email.set(params.get('email')!);
        let confirmEmailRequest: ConfirmEmailRequest = {
          token: params.get('token')!,
          email: this.viewModel.email()
        }

        this.authService.ConfirmEmail(confirmEmailRequest).pipe(take(1)).subscribe(x => {
          if(x.isSuccessful){
            this._snackBar.open("Email confirmed!", "Close");
            this.viewModel.success.set(true);
          }
        })
      }
    })
  }

  resendEmailConfirmationLink(){
    let request: ResendEmailConfirmationRequest = { email: this.viewModel.email() };

    this.authService.ResendEmailConfirmation(request).pipe(take(1)).subscribe(x => {
      if(x.isSuccessful){
        this._snackBar.open("New email for confirmation was sent!", "Close");
      }
    })
  }
}
