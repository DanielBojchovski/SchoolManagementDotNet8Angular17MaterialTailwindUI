import { Routes } from '@angular/router';
import { ListSchoolComponent } from './Repositories/School/Components/list-school/list-school.component';
import { ListPrincipalComponent } from './Repositories/Principal/Components/list-principal/list-principal.component';
import { CreatePrincipalComponent } from './Repositories/Principal/Components/create-principal/create-principal.component';
import { UpdatePrincipalComponent } from './Repositories/Principal/Components/update-principal/update-principal.component';

export const routes: Routes = [
    { path: '', component: ListSchoolComponent },
    { path: 'list-schools', component: ListSchoolComponent },
    { path: 'list-principals', component: ListPrincipalComponent },
    { path: 'create-principal', component: CreatePrincipalComponent },
    { path: 'update-principal/:id', component: UpdatePrincipalComponent },
];
