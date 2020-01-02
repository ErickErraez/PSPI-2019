import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './services/auth.guard';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule), canActivate: [AuthGuard]
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: 'user-form',
        loadChildren: () => import('./pages/student-form/student-form.module').then(m => m.UserFormPageModule)
    },
  {
    path: 'student-proyect',
    loadChildren: () => import('./pages/student-proyect/student-proyect.module').then( m => m.StudentProyectPageModule)
  },
  {
    path: 'teacher-notes',
    loadChildren: () => import('./pages/teacher-notes/teacher-notes.module').then( m => m.TeacherNotesPageModule)
  },
  {
    path: 'teacher-proyects',
    loadChildren: () => import('./pages/teacher-proyects/teacher-proyects.module').then( m => m.TeacherProyectsPageModule)
  },
  {
    path: 'admin-control',
    loadChildren: () => import('./pages/admin-control/admin-control.module').then( m => m.AdminControlPageModule)
  },
  {
    path: 'admin-assign',
    loadChildren: () => import('./pages/admin-assign/admin-assign.module').then( m => m.AdminAssignPageModule)
  }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
