import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StudentService } from '../../Services/student.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IStudentModel } from '../../Models/IStudentModel';
import { take } from 'rxjs';
import { IIdRequest } from '../../../../Common/Requests/IIdRequest';
import { ISetNewMajorForStudentRequest } from '../../Requests/ISetNewMajorForStudentRequest';

@Component({
  selector: 'app-list-student',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './list-student.component.html',
  styleUrl: './list-student.component.css'
})
export class ListStudentComponent implements OnInit {

  constructor(private service: StudentService, private _snackBar: MatSnackBar){}

  students: WritableSignal<IStudentModel[]> = signal([]);

  ngOnInit(): void {
    this.service.GetAllStudents().pipe(take(1)).subscribe(x => {
      this.students.set(x.list);
    })
  }

  deleteStudent(id: number){
    let request: IIdRequest = {
      id: id
    }

    this.service.DeleteStudent(request).pipe(take(1)).subscribe(x => {
      if(x.operationStatusResponse.isSuccessful){
        this._snackBar.open("Student deleted!", "Close");
        this.students.set(x.getAllStudentsResponse.list);
      }
      else{
        this._snackBar.open("Something went wrong!", "Close");
      }
    })
  }

  setMajor(studentId: number, newMajorId: number){
    let request: ISetNewMajorForStudentRequest = {
      studentId: studentId,
      newMajorId: newMajorId
    }

    this.service.SetNewMajorForStudent(request).pipe(take(1)).subscribe(x => {
      if(x.operationStatusResponse.isSuccessful){
        this._snackBar.open("Major updated!", "Close");
      }
      this.students.set(x.getAllStudentsResponse.list);
    })
  }
}
