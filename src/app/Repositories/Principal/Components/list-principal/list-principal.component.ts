import { Component, OnInit } from '@angular/core';
import { PrincipalService } from '../../Services/principal.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IPrincipalModel } from '../../Models/IPrincipalModel';
import { take } from 'rxjs';
import { RouterLink } from '@angular/router';
import { IIdRequest } from '../../../../Common/Requests/IIdRequest';

@Component({
  selector: 'app-list-principal',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './list-principal.component.html',
  styleUrl: './list-principal.component.css'
})
export class ListPrincipalComponent implements OnInit {

  constructor(private service: PrincipalService, private _snackBar: MatSnackBar){}

  principals: IPrincipalModel[] = [];

  ngOnInit(): void {
    this.service.GetAllPrincipals().pipe(take(1)).subscribe(x => {
      this.principals = x.list;
    })
  }

  deletePrincipal(id: number){
    let request: IIdRequest = {
      id: id
    }

    this.service.DeletePrincipal(request).pipe(take(1)).subscribe(x => {
      if(x.operationStatusResponse.isSuccessful){
        this._snackBar.open("Principal deleted!", "Close");
        this.principals = x.getAllPrincipalsResponse.list;
      }
      else{
        this._snackBar.open("Something went wrong!", "Close");
      }
    })
  }
}
