import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../api.service';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from './add-task/add-task.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  project: any;
  tasks: any[] = [];
  users: any = {};
  isReadOnly: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const projectId = Number(this.route.snapshot.paramMap.get('id'));

    this.checkReadOnlyRole();

    this.apiService.getProject(projectId).subscribe((project: any) => {
      this.project = project;
    });

    this.apiService.getTasksByProject(projectId).subscribe((tasks: any) => {
      this.tasks = tasks.tasks || [];
    });

    this.apiService.getUsers().subscribe((users: any[]) => {
      this.users = users.reduce((acc, user) => {
        acc[user.id] = user.username;
        return acc;
      }, {});
    });
  }
  checkReadOnlyRole(): void {
    this.apiService.getUserDetails().subscribe(userDetails => {
      const userId = userDetails.id;
      this.apiService.getRole(userId).subscribe((role : any) => {
        const adminRole = role[0].role;
        if (adminRole == "read_only") {
          this.isReadOnly = true;
        }
      });
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '600px',
      data: { projectId: this.project.id }
    });

    dialogRef.afterClosed().subscribe(formattedTaskData => {
      if (formattedTaskData) {
        this.apiService.createTask(formattedTaskData).subscribe(
          () => {
            // Refresh tasks after creating a new task
            this.apiService.getTasksByProject(this.project.id).subscribe((tasks: any) => {
              this.tasks = tasks.tasks || [];
            });
          },
          error => console.error('Error creating task:', error)
        );
      }
    });
  }

  getUserName(userId: number): string {
    return this.users[userId] || 'Unknown';
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'completed':
        return 'status-completed';
      case 'not_started':
        return 'status-not-started';
      case 'in-progress':
        return 'status-in-progress';
      case 'blocked':
        return 'status-blocked';
      case 'new':
        return 'status-new';
      default:
        return '';
    }
  }

  formatStatus(status: string): string {
    return status.replace(/_/g, ' ').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
}
