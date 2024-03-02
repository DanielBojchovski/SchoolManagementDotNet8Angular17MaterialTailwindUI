import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProfessorService } from '../../Services/professor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { IIdRequest } from '../../../../Common/Requests/IIdRequest';
import { IUpdateProfessorRequest } from '../../Requests/IUpdateProfessorRequest';
import { IUpdateProfessorViewModel } from '../../ViewModels/IUpdateProfessorViewModel';

@Component({
  selector: 'app-update-professor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-professor.component.html',
  styleUrl: './update-professor.component.css'
})
export class UpdateProfessorComponent implements OnInit{

  constructor(private service: ProfessorService, private _snackBar: MatSnackBar, private router: Router, private activatedRoute: ActivatedRoute){ }
  
  viewModel: IUpdateProfessorViewModel = { id: signal(0), name: signal(""), schoolId: signal(0), schoolOptions: signal([])};

  ngOnInit(): void {
    this.activatedRoute.paramMap
    .pipe(take(1)).subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          let idRequest: IIdRequest = {id: parseInt(id)};
          this.service.InitUpdateProfessor(idRequest).pipe(take(1)).subscribe(x => {
            this.viewModel.id.set(x.professor.id);
            this.viewModel.name.set(x.professor.name);
            this.viewModel.schoolId.set(x.professor.schoolId);
            this.viewModel.schoolOptions.set(x.schoolOptions);
            })
        }
      }
    })
  }

  UpdatePrincipal(){
    if(this.viewModel.name().trim() === "" || this.viewModel.schoolId() === 0){
      this._snackBar.open("Invalid name or school not selected!", "Close");
      return;
    }

    let request: IUpdateProfessorRequest = {
      id: this.viewModel.id(),
      name: this.viewModel.name(),
      schoolId: this.viewModel.schoolId()
    }

    this.service.UpdateProfessor(request).pipe(take(1)).subscribe(x => {
      if(x.isSuccessful){
        this._snackBar.open("Professor updated!", "Close");
        this.router.navigate(['/list-professors']);
      }
    })
  }
}
