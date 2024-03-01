import { Component, OnInit, signal } from '@angular/core';
import { SchoolService } from '../../Services/school.service';
import { take } from 'rxjs';
import { ISchoolModel } from '../../Models/ISchoolModel';
import { FormsModule } from '@angular/forms';
import { ICreateSchoolRequest } from '../../Requests/ICreateSchoolRequest';
import {MatSnackBar} from '@angular/material/snack-bar';
import { IUpdateSchoolRequest } from '../../Requests/IUpdateSchoolRequest';
import { IIdRequest } from '../../../../Common/Requests/IIdRequest';
import { ISchoolViewModel } from '../../ViewModels/ISchoolViewModel';

@Component({
  selector: 'app-list-school',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './list-school.component.html',
  styleUrl: './list-school.component.css'
})
export class ListSchoolComponent implements OnInit {

  constructor(private service: SchoolService,private _snackBar: MatSnackBar){}

  viewModel: ISchoolViewModel = {
    schools: signal([]),
    schoolName: signal("")
  };

  ngOnInit(): void {
    this.service.GetAllSchools().pipe(take(1)).subscribe(x => {
      this.viewModel.schools.set(x.list);
    })
  }

  CreateSchool(){
    if(this.viewModel.schoolName().trim() === ""){
      return;
    }

    let request: ICreateSchoolRequest = {
      name: this.viewModel.schoolName()
    }

    this.service.CreateSchool(request).pipe(take(1)).subscribe(x => {
      if(x.operationStatusResponse.isSuccessful){
        this._snackBar.open("School created!", "Close");
        this.viewModel.schools.set(x.getAllSchoolsResponse.list);
      }
    })

    this.viewModel.schoolName.set("");
  }

  UpdateSchool(school: ISchoolModel){
    if(school.name.trim() === ""){
      return;
    }

    let request: IUpdateSchoolRequest = {
      id: school.id,
      name: school.name
    }

    this.service.UpdateSchool(request).pipe(take(1)).subscribe(x => {
      if(x.operationStatusResponse.isSuccessful){
        this._snackBar.open("School updated!", "Close");
        this.viewModel.schools.set(x.getAllSchoolsResponse.list);
      }
    })
  }

  DeleteSchool(school: ISchoolModel){
    let request: IIdRequest = {
      id: school.id
    }

    this.service.DeleteSchool(request).pipe(take(1)).subscribe(x => {
      if(x.operationStatusResponse.isSuccessful){
        this._snackBar.open("School deleted!", "Close");
        this.viewModel.schools.set(x.getAllSchoolsResponse.list);
      }
    })
  }
}
