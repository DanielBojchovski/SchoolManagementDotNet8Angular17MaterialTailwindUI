import { Routes } from '@angular/router';
import { ListSchoolComponent } from './Repositories/School/Components/list-school/list-school.component';
import { ListPrincipalComponent } from './Repositories/Principal/Components/list-principal/list-principal.component';
import { CreatePrincipalComponent } from './Repositories/Principal/Components/create-principal/create-principal.component';
import { UpdatePrincipalComponent } from './Repositories/Principal/Components/update-principal/update-principal.component';
import { ListProfessorComponent } from './Repositories/Professor/Components/list-professor/list-professor.component';
import { CreateProfessorComponent } from './Repositories/Professor/Components/create-professor/create-professor.component';
import { UpdateProfessorComponent } from './Repositories/Professor/Components/update-professor/update-professor.component';
import { ListSubjectComponent } from './Repositories/Subject/Components/list-subject/list-subject.component';
import { ListStudentComponent } from './Repositories/Student/Components/list-student/list-student.component';

export const routes: Routes = [
    //school
    { path: '', component: ListSchoolComponent },
    { path: 'list-schools', component: ListSchoolComponent },
    //principal
    { path: 'list-principals', component: ListPrincipalComponent },
    { path: 'create-principal', component: CreatePrincipalComponent },
    { path: 'update-principal/:id', component: UpdatePrincipalComponent },
    //professor
    { path: 'list-professors', component: ListProfessorComponent },
    { path: 'create-professor', component: CreateProfessorComponent },
    { path: 'update-professor/:id', component: UpdateProfessorComponent },
    //subject
    { path: 'list-subjects', component: ListSubjectComponent },
    //student
    { path: 'list-students', component: ListStudentComponent },
];
