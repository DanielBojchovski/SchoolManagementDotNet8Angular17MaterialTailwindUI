import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProfessorService } from '../../Services/professor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { IIdRequest } from '../../../../Common/Requests/IIdRequest';
import { IInitUpdateProfessorResponse } from '../../Responses/IInitUpdateProfessorResponse';
import { IUpdateProfessorRequest } from '../../Requests/IUpdateProfessorRequest';

@Component({
  selector: 'app-update-professor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-professor.component.html',
  styleUrl: './update-professor.component.css'
})
export class UpdateProfessorComponent implements OnInit{

  constructor(private service: ProfessorService, private _snackBar: MatSnackBar, private router: Router, private activatedRoute: ActivatedRoute){ }
  
  response!: IInitUpdateProfessorResponse;

  ngOnInit(): void {
    this.activatedRoute.paramMap
    .pipe(take(1)).subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          let idRequest: IIdRequest = {id: parseInt(id)};
          this.service.InitUpdateProfessor(idRequest).pipe(take(1)).subscribe(x => {
              this.response = x;
            })
        }
      }
    })
  }

  UpdatePrincipal(){
    let request: IUpdateProfessorRequest = {
      id: this.response.professor.id,
      name: this.response.professor.name,
      schoolId:this.response.professor.schoolId
    }

    this.service.UpdateProfessor(request).pipe(take(1)).subscribe(x => {
      if(x.isSuccessful){
        this._snackBar.open("Professor updated!", "Close");
        this.router.navigate(['/list-professors']);
      }
    })
  }
}
