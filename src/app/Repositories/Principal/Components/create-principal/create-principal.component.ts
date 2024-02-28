import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { PrincipalService } from '../../Services/principal.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IDropDownItem } from '../../../../Common/Models/IDropDownItem';
import { take } from 'rxjs';
import { ICreatePrincipalRequest } from '../../Requests/ICreatePrincipalRequest';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-principal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-principal.component.html',
  styleUrl: './create-principal.component.css'
})
export class CreatePrincipalComponent implements OnInit {

  constructor(private service: PrincipalService, private _snackBar: MatSnackBar, private router: Router){}

  schoolOptions: IDropDownItem[] = [];

  request: WritableSignal<ICreatePrincipalRequest> = signal({
    name: "",
    schoolId: 0
  });

  ngOnInit(): void {
    this.service.GetSchoolsDropDown().pipe(take(1)).subscribe(x => {
      this.schoolOptions = x.list;
    })
  }

  CreatePrincipal(){
    if(this.request.name.trim() === "" || this.request().schoolId === 0){
      this._snackBar.open("Invalid name or school not selected!", "Close");
      return;
    }

    this.service.CreatePrincipal(this.request()).pipe(take(1)).subscribe(x => {
      if(x.isSuccessful){
        this._snackBar.open("Principal created!", "Close");
        this.router.navigate(['/list-principals']);
      }
    })
  }
}
