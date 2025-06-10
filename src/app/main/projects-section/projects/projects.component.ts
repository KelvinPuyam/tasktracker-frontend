import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../../api.service';
import { AuthService } from '../../../auth.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];
  filteredProjects: any[] = [];
  users: any = {};
  isAdmin: boolean = false;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.apiService.getProjects().subscribe((data: any[]) => {
      this.projects = data;
      this.filteredProjects = data;
    });

    this.apiService.getUsers().subscribe((users: any[]) => {
      this.users = users.reduce((acc, user) => {
        acc[user.id] = user.username;
        return acc;
      }, {});
    });

    this.checkAdminRole();
  }

  checkAdminRole(): void {
    this.apiService.getUserDetails().subscribe(userDetails => {
      const userId = userDetails.id;
      this.apiService.getRole(userId).subscribe((role : any) => {
        const adminRole = role[0].role;
        if (adminRole == "admin") {
          this.isAdmin = true;
        }
      });
    });
  }

  showTasks(projectId: number): void {
    this.router.navigate([`/projects/${projectId}/tasks`]);
  }

  getUserName(userId: number): string {
    return this.users[userId] || 'Unknown';
  }

  trackByProjectId(index: number, project: any): number {
    return project.id;
  }

  navigateToAddProject(): void {
    this.router.navigate(['/projects/new']);
  }

  editProject(projectId: number): void {
    this.router.navigate([`/projects/edit/${projectId}`]);
  }

  deleteProject(projectId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.deleteProject(projectId).subscribe(() => {
          this.projects = this.projects.filter(project => project.id !== projectId);
          this.filteredProjects = this.filteredProjects.filter(project => project.id !== projectId);
        });
      }
    });
  }

  onFilterInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.filterProjects(inputElement.value);
  }

  filterProjects(query: string): void {
    this.filteredProjects = this.projects.filter(project =>
      project.name.toLowerCase().includes(query.toLowerCase())
    );
  }
}
