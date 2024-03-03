import { Component, OnInit, signal } from '@angular/core';
import { ICreateStudentRequest } from '../../Requests/ICreateStudentRequest';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../Services/student.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ISubjectDto } from '../../../Subject/Models/ISubjectDto';
import { take } from 'rxjs';
import { ISubjectInfo } from '../../../Subject/Models/ISubjectInfo';
import { ICreateStudentViewModel } from '../../ViewModels/ICreateStudentViewModel';

@Component({
  selector: 'app-create-student',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-student.component.html',
  styleUrl: './create-student.component.css'
})
export class CreateStudentComponent implements OnInit {

  constructor(private service: StudentService, private _snackBar: MatSnackBar, private router: Router){}

  viewModel: ICreateStudentViewModel = { name: signal(""), selectedSubjects: signal([]), subjectOptions: signal([])};

  ngOnInit(): void {
    this.service.GetAvailableSubjects().pipe(take(1)).subscribe(x => {
      this.viewModel.subjectOptions.set(x.list);
    })
  }

  CreateStudent(){
    if(this.viewModel.name().trim() === "") return;
    if(this.viewModel.selectedSubjects().length === 0) return;

    let request: ICreateStudentRequest = {
      name: this.viewModel.name(),
      subjects: this.viewModel.selectedSubjects()
    };

    this.service.CreateStudent(request).pipe(take(1)).subscribe(x => {
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
      this.viewModel.selectedSubjects().push(newOption);
    } else {
      this.viewModel.selectedSubjects.set(this.viewModel.selectedSubjects().filter(x => x.subjectId !== option.id));
    }
  }

  updateMajor(option: ISubjectDto){
    this.viewModel.selectedSubjects().forEach(x => x.isMajor = x.subjectId === option.id);
    this.viewModel.subjectOptions().forEach(x => x.isMajor = x.id === option.id);
  }
}
