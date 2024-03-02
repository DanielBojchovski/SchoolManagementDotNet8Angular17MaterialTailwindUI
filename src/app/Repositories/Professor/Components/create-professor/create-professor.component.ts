import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProfessorService } from '../../Services/professor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ICreateProfessorRequest } from '../../Requests/ICreateProfessorRequest';
import { take } from 'rxjs';
import { ICreateProfessorViewModel } from '../../ViewModels/ICreateProfessorViewModel';

@Component({
  selector: 'app-create-professor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-professor.component.html',
  styleUrl: './create-professor.component.css'
})
export class CreateProfessorComponent implements OnInit{

  constructor(private service: ProfessorService, private _snackBar: MatSnackBar, private router: Router){}

  viewModel: ICreateProfessorViewModel = { name: signal(""), schoolId: signal(0), schoolOptions: signal([])};

  ngOnInit(): void {
    this.service.GetSchoolsDropDown().pipe(take(1)).subscribe(x => {
      this.viewModel.schoolOptions.set(x.list);
    })
  }

  CreateProfessor(){
    if(this.viewModel.name().trim() === "" || this.viewModel.schoolId() === 0){
      this._snackBar.open("Invalid name or school not selected!", "Close");
      return;
    }

    let request: WritableSignal<ICreateProfessorRequest> = signal({
      name: this.viewModel.name(),
      schoolId: this.viewModel.schoolId()
    });

    this.service.CreateProfessor(request()).pipe(take(1)).subscribe(x => {
      if(x.isSuccessful){
        this._snackBar.open("Professor created!", "Close");
        this.router.navigate(['/list-professors']);
      }
    })
  }
}
