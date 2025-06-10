import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './homepage/dashboard/dashboard.component';
import { TeammatesComponent } from './homepage/teammates/teammates.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ApiService } from '../api.service';
import { NavbarComponent } from './Headers/navbar/navbar.component';
import { TasksHomeComponent } from './homepage/tasks-home/tasks-home.component';
import { TasksComponent } from './projects-section/tasks/tasks.component';
import { ProjectDetailComponent } from './projects-section/project-detail/project-detail.component';
import { ProjectsComponent } from './projects-section/projects/projects.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthGuard } from '../auth.guard';
import { AuthService } from '../auth.service';
import { MatMenuModule } from '@angular/material/menu';
import { NewProjectComponent } from './projects-section/new-project/new-project.component';
import { EditProjectComponent } from './projects-section/edit-project/edit-project.component';
import { ConfirmationDialogComponent } from './projects-section/confirmation-dialog/confirmation-dialog.component';
import { YourTaskPageComponent } from './your-task-page/your-task-page.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DialogModule } from '@angular/cdk/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AssignRolesComponent } from './assign-roles/assign-roles.component';
import { AddTaskComponent } from './projects-section/tasks/add-task/add-task.component';

const routes: Routes = [
    {
      path: '',
      component: MainComponent,
      canActivate: [AuthGuard],
      children: [
        { path: 'home', component: HomepageComponent },
        { path: 'projects', component: ProjectsComponent },
        { path: 'projects/new', component: NewProjectComponent },
        { path: 'projects/:id', component: ProjectDetailComponent },
        { path: 'projects/:id/tasks', component: TasksComponent },
        { path: 'projects/edit/:id', component: EditProjectComponent },
        { path: 'new-project', component: NewProjectComponent },
        { path: 'yourtask', component:  YourTaskPageComponent},
        { path: 'roles', component: AssignRolesComponent},
        { path: '', redirectTo: 'home', pathMatch: 'full' },
      ]
    }
  ];
@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent,
    TeammatesComponent,
    TasksComponent,
    TasksComponent,
    NavbarComponent,
    ProjectsComponent,
    ProjectDetailComponent,
    TasksHomeComponent,
    HomepageComponent,
    NewProjectComponent,
    EditProjectComponent,
    ConfirmationDialogComponent,
    YourTaskPageComponent,
    AddTaskComponent,
    AssignRolesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatTabsModule,
    DialogModule,
    DragDropModule,
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule.forChild(routes),
  ],
  exports:[
    RouterModule
  ],
  providers:[
    ApiService, AuthGuard, AuthService
  ]
})
export class MainModule { }
