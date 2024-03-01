import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SubjectService } from '../../Services/subject.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ISubjectModel } from '../../Models/ISubjectModel';
import { take } from 'rxjs';
import { ICreateSubjectRequest } from '../../Requests/ICreateSubjectRequest';
import { IUpdateSubjectRequest } from '../../Requests/IUpdateSubjectRequest';
import { IIdRequest } from '../../../../Common/Requests/IIdRequest';
import { ISubjectViewModel } from '../../ViewModels/ISubjectViewModel';

@Component({
  selector: 'app-list-subject',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './list-subject.component.html',
  styleUrl: './list-subject.component.css'
})
export class ListSubjectComponent implements OnInit {

  constructor(private service: SubjectService,private _snackBar: MatSnackBar){}

  viewModel: ISubjectViewModel = {
    subjects: signal([]),
    subjectName: signal("")
  };

  ngOnInit(): void {
    this.service.GetAllSubjects().pipe(take(1)).subscribe(x => {
      this.viewModel.subjects.set(x.list);
    })
  }

  CreateSubject(){
    if(this.viewModel.subjectName().trim() === ""){
      return;
    }

    let request: ICreateSubjectRequest = {
      name: this.viewModel.subjectName()
    }

    this.service.CreateSubject(request).pipe(take(1)).subscribe(x => {
      if(x.operationStatusResponse.isSuccessful){
        this._snackBar.open("Subject created!", "Close");
        this.viewModel.subjects.set(x.getAllSubjectsResponse.list);
      }
    })

    this.viewModel.subjectName.set("");
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
        this.viewModel.subjects.set(x.getAllSubjectsResponse.list);
      }
    })
  }

  DeleteSubject(school: ISubjectModel){
    let request: IIdRequest = {
      id: school.id
    }

    this.service.DeleteSubject(request).pipe(take(1)).subscribe(x => {
      if(x.operationStatusResponse.isSuccessful){
        this._snackBar.open("Subject deleted!", "Close");
        this.viewModel.subjects.set(x.getAllSubjectsResponse.list);
      }
    })
  }
}
