import { Routes } from '@angular/router';
import { authGuard } from './Guards/auth.guard';

export const routes: Routes = [
    //school
    { path: '', loadComponent: () => import('./Repositories/School/Components/list-school/list-school.component').then(c => c.ListSchoolComponent) },
    { path: 'list-schools', loadComponent: () => import('./Repositories/School/Components/list-school/list-school.component').then(c => c.ListSchoolComponent) },
    //principal
    { path: 'list-principals', loadComponent: () => import('./Repositories/Principal/Components/list-principal/list-principal.component').then(c => c.ListPrincipalComponent) },
    { path: 'create-principal', loadComponent: () => import('./Repositories/Principal/Components/create-principal/create-principal.component').then(c => c.CreatePrincipalComponent) },
    { path: 'update-principal/:id', loadComponent: () => import('./Repositories/Principal/Components/update-principal/update-principal.component').then(c => c.UpdatePrincipalComponent) },
    //professor
    { path: 'list-professors', loadComponent: () => import('./Repositories/Professor/Components/list-professor/list-professor.component').then(c => c.ListProfessorComponent) },
    { path: 'create-professor', loadComponent: () => import('./Repositories/Professor/Components/create-professor/create-professor.component').then(c => c.CreateProfessorComponent) },
    { path: 'update-professor/:id', loadComponent: () => import('./Repositories/Professor/Components/update-professor/update-professor.component').then(c => c.UpdateProfessorComponent) },
    //subject
    { path: 'list-subjects', loadComponent: () => import('./Repositories/Subject/Components/list-subject/list-subject.component').then(c => c.ListSubjectComponent) },
    //student
    { path: 'list-students', loadComponent: () => import('./Repositories/Student/Components/list-student/list-student.component').then(c => c.ListStudentComponent) },
    { path: 'create-student', loadComponent: () => import('./Repositories/Student/Components/create-student/create-student.component').then(c => c.CreateStudentComponent) },
    { path: 'update-student/:id', loadComponent: () => import('./Repositories/Student/Components/update-student/update-student.component').then(c => c.UpdateStudentComponent) },
    //auth
    { path: 'account/register',  loadComponent: () => import('./Authentication/Components/register/register.component').then(c => c.RegisterComponent)},
    { path: 'account/confirm-email/:token/:email', loadComponent: () => import('./Authentication/Components/confirm-email/confirm-email.component').then(c => c.ConfirmEmailComponent)},
    { path: 'account/login', loadComponent: () => import('./Authentication/Components/login/login.component').then(c => c.LoginComponent) },
    { path: 'account/change-password', loadComponent: () => import('./Authentication/Components/change-password/change-password.component').then(c => c.ChangePasswordComponent)},
    { path: 'account/forgot-password/:token/:email', loadComponent: () => import('./Authentication/Components/forgot-password/forgot-password.component').then(c => c.ForgotPasswordComponent)},
    { path: 'account/make-admin', loadComponent: () => import('./Authentication/Components/make-user-admin/make-user-admin.component').then(c => c.MakeUserAdminComponent) , canActivate: [authGuard],},
];
