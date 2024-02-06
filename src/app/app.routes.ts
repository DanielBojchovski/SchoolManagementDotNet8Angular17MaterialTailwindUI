import { Routes } from '@angular/router';
import { ListSchoolComponent } from './Repositories/School/Components/list-school/list-school.component';

export const routes: Routes = [
    { path: '', component: ListSchoolComponent },
    { path: 'list-schools', component: ListSchoolComponent },
];
