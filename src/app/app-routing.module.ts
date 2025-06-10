import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './main/projects-section/projects/projects.component';
import { ProjectDetailComponent } from './main/projects-section/project-detail/project-detail.component';
import { TasksComponent } from './main/projects-section/tasks/tasks.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { MainComponent } from './main/main.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
