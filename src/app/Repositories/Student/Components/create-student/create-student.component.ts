import { Component, OnInit } from '@angular/core';
import { ICreateStudentRequest } from '../../Requests/ICreateStudentRequest';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../Services/student.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ISubjectDto } from '../../../Subject/Models/ISubjectDto';
import { take } from 'rxjs';
import { ISubjectInfo } from '../../../Subject/Models/ISubjectInfo';

@Component({
  selector: 'app-create-student',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-student.component.html',
  styleUrl: './create-student.component.css'
})
export class CreateStudentComponent implements OnInit {

  constructor(private service: StudentService, private _snackBar: MatSnackBar, private router: Router){}

  subjectOptions: ISubjectDto[] = [];

  request: ICreateStudentRequest = {
    name: "",
    subjects: []
  }

  ngOnInit(): void {
    this.service.GetAvailableSubjects().pipe(take(1)).subscribe(x => {
      this.subjectOptions = x.list;
    })
  }

  CreateStudent(){
    if(this.request.name.trim() === "") return;
    if(this.request.subjects.length === 0) return;

    this.service.CreateStudent(this.request).pipe(take(1)).subscribe(x => {
      if(x.isSuccessful){
        this._snackBar.open("Student created!", "Close");
        this.router.navigate(['/list-students']);
      }
    })
  }

  updateSelectedValues(option: ISubjectDto){
    if (option.isSelected) {
      let newOption: ISubjectInfo = {
        subjectId: option.id,
        isMajor: option.isMajor
      }
      this.request.subjects.push(newOption);
    } else {
      this.request.subjects = this.request.subjects.filter(x => x.subjectId !== option.id);
    }
  }

  updateMajor(option: ISubjectDto){
    this.request.subjects.forEach(x => x.isMajor = x.subjectId === option.id);
  }
}
