import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { JwtService } from '../../Services/jwt.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MakeUserAdminViewModel } from '../../ViewModels/MakeUserAdminViewModel';
import { GetAvailableUsersRequest } from '../../Requests/GetAvailableUsersRequest';
import { take } from 'rxjs';
import { UpdatePermissionRequest } from '../../Requests/UpdatePermissionRequest';

@Component({
  selector: 'app-make-user-admin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './make-user-admin.component.html',
  styleUrl: './make-user-admin.component.css'
})
export class MakeUserAdminComponent implements OnInit {

  constructor(private authService: AuthService, private jwtService: JwtService, private router: Router, private _snackBar: MatSnackBar) { }

  viewModel: MakeUserAdminViewModel = { id: signal(""), users: signal([]), token: signal(null) };

  ngOnInit(): void {
    if(this.jwtService.isLoggedIn()){
      this.viewModel.token.set(this.jwtService.decodeToken());
      if(this.viewModel.token()){
        let request: GetAvailableUsersRequest = { currentLoggedInUserId: this.viewModel.token()!.sub };
        this.authService.GetAvailableUsers(request).pipe(take(1)).subscribe(x => {
          this.viewModel.users.set(x.list);
        })
      }
    }
  }

  Redirect(){
    if(this.viewModel.id().trim() !== ""){
      let request: UpdatePermissionRequest = {id: this.viewModel.id()};
      this.authService.MakeAdmin(request).pipe(take(1)).subscribe(x => {
        if(x.isSuccessful){
          this._snackBar.open("User is now admin!", "Close");
        }
        else{
          this._snackBar.open("Something went wrong!", "Close");
        }
      })
      this.router.navigate(["/"]);
    }
  }
}
