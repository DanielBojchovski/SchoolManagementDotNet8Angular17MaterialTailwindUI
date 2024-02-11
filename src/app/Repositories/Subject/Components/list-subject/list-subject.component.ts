import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SubjectService } from '../../Services/subject.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ISubjectModel } from '../../Models/ISubjectModel';
import { take } from 'rxjs';
import { ICreateSubjectRequest } from '../../Requests/ICreateSubjectRequest';
import { IUpdateSubjectRequest } from '../../Requests/IUpdateSubjectRequest';
import { IIdRequest } from '../../../../Common/Requests/IIdRequest';

@Component({
  selector: 'app-list-subject',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './list-subject.component.html',
  styleUrl: './list-subject.component.css'
})
export class ListSubjectComponent implements OnInit {

  constructor(private service: SubjectService,private _snackBar: MatSnackBar){}

  subjects: ISubjectModel[] = [];

  subjectName: string = "";

  ngOnInit(): void {
    this.service.GetAllSubjects().pipe(take(1)).subscribe(x => {
      this.subjects = x.list;
    })
  }

  CreateSubject(){
    if(this.subjectName.trim() === ""){
      return;
    }

    let request: ICreateSubjectRequest = {
      name: this.subjectName
    }

    this.service.CreateSubject(request).pipe(take(1)).subscribe(x => {
      if(x.operationStatusResponse.isSuccessful){
        this._snackBar.open("Subject created!", "Close");
        this.subjects = x.getAllSubjectsResponse.list;
      }
    })

    this.subjectName = "";
  }

  UpdateSubject(school: ISubjectModel){
    if(school.name.trim() === ""){
      return;
    }

    let request: IUpdateSubjectRequest = {
      id: school.id,
      name: school.name
    }

    this.service.UpdateSubject(request).pipe(take(1)).subscribe(x => {
      if(x.operationStatusResponse.isSuccessful){
        this._snackBar.open("Subject updated!", "Close");
        this.subjects = x.getAllSubjectsResponse.list;
      }
    })
  }

  DeleteSchool(school: ISubjectModel){
    let request: IIdRequest = {
      id: school.id
    }

    this.service.DeleteSubject(request).pipe(take(1)).subscribe(x => {
      if(x.operationStatusResponse.isSuccessful){
        this._snackBar.open("Subject deleted!", "Close");
        this.subjects = x.getAllSubjectsResponse.list;
      }
    })
  }
}
