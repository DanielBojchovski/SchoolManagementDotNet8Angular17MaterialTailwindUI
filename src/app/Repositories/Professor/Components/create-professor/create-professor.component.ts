import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProfessorService } from '../../Services/professor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IDropDownItem } from '../../../../Common/Models/IDropDownItem';
import { ICreateProfessorRequest } from '../../Requests/ICreateProfessorRequest';
import { take } from 'rxjs';

@Component({
  selector: 'app-create-professor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-professor.component.html',
  styleUrl: './create-professor.component.css'
})
export class CreateProfessorComponent implements OnInit{

  constructor(private service: ProfessorService, private _snackBar: MatSnackBar, private router: Router){}

  schoolOptions: IDropDownItem[] = [];

  request: ICreateProfessorRequest = {
    name: "",
    schoolId: 0
  }

  ngOnInit(): void {
    this.service.GetSchoolsDropDown().pipe(take(1)).subscribe(x => {
      this.schoolOptions = x.list;
    })
  }

  CreateProfessor(){
    if(this.request.name.trim() === "" || this.request.schoolId === 0){
      this._snackBar.open("Invalid name or school not selected!", "Close");
      return;
    }

    this.service.CreateProfessor(this.request).pipe(take(1)).subscribe(x => {
      if(x.isSuccessful){
        this._snackBar.open("Professor created!", "Close");
        this.router.navigate(['/list-professors']);
      }
    })
  }
}
