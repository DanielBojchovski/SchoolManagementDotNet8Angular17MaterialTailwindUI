import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../Services/student.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IUpdateStudentRequest } from '../../Requests/IUpdateStudentRequest';
import { take } from 'rxjs';
import { IIdRequest } from '../../../../Common/Requests/IIdRequest';
import { ISubjectDto } from '../../../Subject/Models/ISubjectDto';
import { ISubjectInfo } from '../../../Subject/Models/ISubjectInfo';
import { IUpdateStudentViewModel } from '../../ViewModels/IUpdateStudentViewModel';

@Component({
  selector: 'app-update-student',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-student.component.html',
  styleUrl: './update-student.component.css'
})
export class UpdateStudentComponent implements OnInit {

  constructor(private service: StudentService, private _snackBar: MatSnackBar, private router: Router, private activatedRoute: ActivatedRoute){}

  viewModel: IUpdateStudentViewModel = { student: signal(null), subjects: signal([])};

  ngOnInit(): void {
    this.activatedRoute.paramMap
    .pipe(take(1)).subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          let idRequest: IIdRequest = {id: parseInt(id)};
          this.service.GetStudentById(idRequest).pipe(take(1)).subscribe(x => {
              if(x){
                this.viewModel.student.set(x);
                this.viewModel.subjects.set(x.subjects.filter(x => x.isSelected).map(x => ({subjectId: x.id, isMajor: x.isMajor})));
              }
            })
        }
      }
    })
  }

  UpdateStudent(){
    if(this.viewModel.student()!.name.trim() === "") return;
    if(this.viewModel.subjects().length === 0) return;

    let request: IUpdateStudentRequest = {
      id: this.viewModel.student()!.id,
      name: this.viewModel.student()!.name,
      subjects: this.viewModel.subjects()
    }

    this.service.UpdateStudent(request).pipe(take(1)).subscribe(x => {
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
      this.viewModel.subjects().push(newOption);
    } else {
      this.viewModel.subjects.set(this.viewModel.subjects().filter(x => x.subjectId !== option.id));
    }
  }

  updateMajor(option: ISubjectDto){
    this.viewModel.subjects().forEach(x => x.isMajor = x.subjectId === option.id);
    this.viewModel.student()!.subjects.forEach(x => x.isMajor = x.id === option.id);
  }
}
