import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {StudentProyectComponent} from './student-proyect.component';


const routes: Routes = [{
  path: '',
  component: StudentProyectComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentProyectRoutingModule {
}
