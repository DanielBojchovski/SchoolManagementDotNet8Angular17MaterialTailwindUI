import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../Services/student.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IStudentModel } from '../../Models/IStudentModel';
import { IUpdateStudentRequest } from '../../Requests/IUpdateStudentRequest';
import { take } from 'rxjs';
import { IIdRequest } from '../../../../Common/Requests/IIdRequest';
import { ISubjectDto } from '../../../Subject/Models/ISubjectDto';
import { ISubjectInfo } from '../../../Subject/Models/ISubjectInfo';

@Component({
  selector: 'app-update-student',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-student.component.html',
  styleUrl: './update-student.component.css'
})
export class UpdateStudentComponent implements OnInit {

  constructor(private service: StudentService, private _snackBar: MatSnackBar, private router: Router, private activatedRoute: ActivatedRoute){}

  student: IStudentModel | null = null;

  request: IUpdateStudentRequest = {
    id: 0,
    name: "",
    subjects: []
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap
    .pipe(take(1)).subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          let idRequest: IIdRequest = {id: parseInt(id)};
          this.service.GetStudentById(idRequest).pipe(take(1)).subscribe(x => {
              if(x){
                this.student = x;
                this.request.id = idRequest.id;
                this.request.subjects = x.subjects.filter(x => x.isSelected).map(x => ({subjectId: x.id, isMajor: x.isMajor}));
              }
            })
        }
      }
    })
  }

  UpdateStudent(){
    this.request.name = this.student!.name;
    if(this.request.name.trim() === "") return;
    if(this.request.subjects.length === 0) return;

    this.service.UpdateStudent(this.request).pipe(take(1)).subscribe(x => {
      if(x.isSuccessful){
        this._snackBar.open("Student updated!", "Close");
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
    this.student!.subjects.forEach(x => x.isMajor = x.id === option.id);
  }
}
