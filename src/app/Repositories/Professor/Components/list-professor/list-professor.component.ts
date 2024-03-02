import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfessorService } from '../../Services/professor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';
import { IIdRequest } from '../../../../Common/Requests/IIdRequest';
import { IListProfessorViewModel } from '../../ViewModels/IListProfessorViewModel';

@Component({
  selector: 'app-list-professor',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './list-professor.component.html',
  styleUrl: './list-professor.component.css'
})
export class ListProfessorComponent implements OnInit {

  constructor(private service: ProfessorService, private _snackBar: MatSnackBar){}

  viewModel: IListProfessorViewModel = { professors: signal([]) };

  ngOnInit(): void {
    this.service.GetAllProfessors().pipe(take(1)).subscribe(x => {
      this.viewModel.professors.set(x.list);
    })
  }

  deleteProfessor(id: number){
    let request: IIdRequest = {
      id: id
    }

    this.service.DeleteProfessor(request).pipe(take(1)).subscribe(x => {
      if(x.operationStatusResponse.isSuccessful){
        this._snackBar.open("Professor deleted!", "Close");
        this.viewModel.professors.set(x.getAllProfessorsResponse.list);
      }
      else{
        this._snackBar.open("Something went wrong!", "Close");
      }
    })
  }
}
