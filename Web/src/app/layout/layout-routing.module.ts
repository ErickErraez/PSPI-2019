import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from './layout.component';


const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [
    {path: '', redirectTo: 'home', pathMatch: 'prefix'},
    {
      path: 'home',
      loadChildren: () =>
        import('./home/home.module')
          .then(m => m.HomeModule)
    },
    {
      path: 'student/form',
      loadChildren: () =>
        import('./student-form/student-form.module')
          .then(m => m.StudentFormModule)
    },
    {
      path: 'student/proyect',
      loadChildren: () =>
        import('./student-proyect/student-proyect.module')
          .then(m => m.StudentProyectModule)
    },

    {
      path: 'teacher/notes',
      loadChildren: () =>
        import('./teacher-notes/teacher-notes.module')
          .then(m => m.TeacherNotesModule)
    },
    {
      path: 'teacher/proyects',
      loadChildren: () =>
        import('./teacher-proyects/teacher-proyects.module')
          .then(m => m.TeacherProyectsModule)
    },
    {
      path: 'admin/control',
      loadChildren: () =>
        import('./admin-control/admin-control.module')
          .then(m => m.AdminControlModule)
    },
    {
      path: 'admin/assign',
      loadChildren: () =>
        import('./admin-assign/admin-assign.module')
          .then(m => m.AdminAssignModule)
    },

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}
