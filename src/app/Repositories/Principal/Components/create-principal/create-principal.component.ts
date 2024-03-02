import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { PrincipalService } from '../../Services/principal.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';
import { ICreatePrincipalRequest } from '../../Requests/ICreatePrincipalRequest';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ICreatePrincipalViewModel } from '../../ViewModels/ICreatePrincipalViewModel';

@Component({
  selector: 'app-create-principal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-principal.component.html',
  styleUrl: './create-principal.component.css'
})
export class CreatePrincipalComponent implements OnInit {

  constructor(private service: PrincipalService, private _snackBar: MatSnackBar, private router: Router){}

  viewModel: ICreatePrincipalViewModel = { name: signal(""), schoolId: signal(0), schoolOptions: signal([])};

  ngOnInit(): void {
    this.service.GetSchoolsDropDown().pipe(take(1)).subscribe(x => {
      this.viewModel.schoolOptions.set(x.list);
    })
  }

  CreatePrincipal(){
    if(this.viewModel.name().trim() === "" || this.viewModel.schoolId() === 0){
      this._snackBar.open("Invalid name or school not selected!", "Close");
      return;
    }

    let request: WritableSignal<ICreatePrincipalRequest> = signal({
      name: this.viewModel.name(),
      schoolId: this.viewModel.schoolId()
    });

    this.service.CreatePrincipal(request()).pipe(take(1)).subscribe(x => {
      if(x.isSuccessful){
        this._snackBar.open("Principal created!", "Close");
        this.router.navigate(['/list-principals']);
      }
    })
  }
}
