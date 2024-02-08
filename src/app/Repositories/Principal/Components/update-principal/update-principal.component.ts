import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrincipalService } from '../../Services/principal.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IInitUpdatePrincipalResponse } from '../../Responses/IInitUpdatePrincipalResponse';
import { take } from 'rxjs';
import { IIdRequest } from '../../../../Common/Requests/IIdRequest';
import { IUpdatePrincipalRequest } from '../../Requests/IUpdatePrincipalRequest';

@Component({
  selector: 'app-update-principal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-principal.component.html',
  styleUrl: './update-principal.component.css'
})
export class UpdatePrincipalComponent implements OnInit {

  constructor(private service: PrincipalService, private _snackBar: MatSnackBar, private router: Router, private activatedRoute: ActivatedRoute){ }

  response!: IInitUpdatePrincipalResponse;

  ngOnInit(): void {
    this.activatedRoute.paramMap
    .pipe(take(1)).subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          let idRequest: IIdRequest = {id: parseInt(id)};
          this.service.InitUpdatePrincipal(idRequest).pipe(take(1)).subscribe(x => {
              this.response = x;
            })
        }
      }
    })
  }

  UpdatePrincipal(){
    let request: IUpdatePrincipalRequest = {
      id: this.response.principal.id,
      name: this.response.principal.name,
      schoolId:this.response.principal.schoolId
    }

    this.service.UpdatePrincipal(request).pipe(take(1)).subscribe(x => {
      if(x.isSuccessful){
        this._snackBar.open("Principal updated!", "Close");
        this.router.navigate(['/list-principals']);
      }
    })
  }
}
