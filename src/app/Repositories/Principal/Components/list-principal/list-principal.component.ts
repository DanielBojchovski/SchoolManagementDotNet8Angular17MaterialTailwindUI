import { Component, OnInit, signal } from '@angular/core';
import { PrincipalService } from '../../Services/principal.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';
import { RouterLink } from '@angular/router';
import { IIdRequest } from '../../../../Common/Requests/IIdRequest';
import { IListPrincipalViewModel } from '../../ViewModels/IListPrincipalViewModel';

@Component({
  selector: 'app-list-principal',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './list-principal.component.html',
  styleUrl: './list-principal.component.css'
})
export class ListPrincipalComponent implements OnInit {

  constructor(private service: PrincipalService, private _snackBar: MatSnackBar){}

  viewModel: IListPrincipalViewModel = { principals: signal([]) };

  ngOnInit(): void {
    this.service.GetAllPrincipals().pipe(take(1)).subscribe(x => {
      this.viewModel.principals.set(x.list);
    })
  }

  deletePrincipal(id: number){
    let request: IIdRequest = {
      id: id
    }

    this.service.DeletePrincipal(request).pipe(take(1)).subscribe(x => {
      if(x.operationStatusResponse.isSuccessful){
        this._snackBar.open("Principal deleted!", "Close");
        this.viewModel.principals.set(x.getAllPrincipalsResponse.list);
      }
      else{
        this._snackBar.open("Something went wrong!", "Close");
      }
    })
  }
}
