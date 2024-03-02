import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrincipalService } from '../../Services/principal.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { IIdRequest } from '../../../../Common/Requests/IIdRequest';
import { IUpdatePrincipalRequest } from '../../Requests/IUpdatePrincipalRequest';
import { IUpdatePrincipalViewModel } from '../../ViewModels/IUpdatePrincipalViewModel';

@Component({
  selector: 'app-update-principal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-principal.component.html',
  styleUrl: './update-principal.component.css'
})
export class UpdatePrincipalComponent implements OnInit {

  constructor(private service: PrincipalService, private _snackBar: MatSnackBar, private router: Router, private activatedRoute: ActivatedRoute){ }

  viewModel: IUpdatePrincipalViewModel = { id: signal(0), name: signal(""), schoolId: signal(0), schoolOptions: signal([])};

  ngOnInit(): void {
    this.activatedRoute.paramMap
    .pipe(take(1)).subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          let idRequest: IIdRequest = {id: parseInt(id)};
          this.service.InitUpdatePrincipal(idRequest).pipe(take(1)).subscribe(x => {
              this.viewModel.id.set(x.principal.id);
              this.viewModel.name.set(x.principal.name);
              this.viewModel.schoolId.set(x.principal.schoolId);
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

    let request: IUpdatePrincipalRequest = {
      id: this.viewModel.id(),
      name: this.viewModel.name(),
      schoolId: this.viewModel.schoolId()
    }

    this.service.UpdatePrincipal(request).pipe(take(1)).subscribe(x => {
      if(x.isSuccessful){
        this._snackBar.open("Principal updated!", "Close");
        this.router.navigate(['/list-principals']);
      }
    })
  }
}
