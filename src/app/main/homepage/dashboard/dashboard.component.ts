import { Component, EventEmitter, OnInit, Output, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ApiService } from '../../../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('projectsContainer') projectsContainer!: ElementRef;

  projects: { name: string; description: string; start_date: string; end_date: string; owner: string; id: number }[] = [];

  selectedProjectId: number | null = null;

  @Output() tasks = new EventEmitter<any[]>();
  @Output() users = new EventEmitter<{ projectOwner: any, teammates: any[] }>();

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.getProjects().subscribe((projects: any[]) => {
      this.projects = projects;

      this.projects.forEach(project => {
        this.apiService.getUserName(project.owner).subscribe((userdetails: any) => {
          project.owner = userdetails.username || 'Unknown';
        });
      });
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.projectsContainer && this.projectsContainer.nativeElement) {
        console.log('Projects container is available');
      } else {
        console.log('Projects container is not available');
      }
    }, 0);
  }

  redirectToProjectDetails(projectId: number): void {
    this.router.navigate(['projects/', projectId]);
  }

  showTasks(projectId: number): void {
    this.selectedProjectId = projectId;
    this.apiService.getTasksByProject(projectId).subscribe((tasks: any) => {
      let projectTasks = tasks.tasks || [];
      projectTasks.forEach((task: any) => {
        this.apiService.getUserName(task.owner).subscribe((userdetails: any) => {
          task.owner = userdetails.username || 'Unknown';
        });
      });
      this.tasks.emit(projectTasks);
    });

    this.apiService.getUsersByProject(projectId).subscribe((data: any) => {
      this.users.emit({
        projectOwner: data.project_owner,
        teammates: data.users.length > 0 ? data.users : []
      });
    });
  }

  scrollLeft(): void {
    console.log('Scrolling left');
    if (this.projectsContainer && this.projectsContainer.nativeElement) {
      this.projectsContainer.nativeElement.scrollLeft -= 200;
    } else {
      console.log('Projects container not available for scrolling left');
    }
  }

  scrollRight(): void {
    console.log('Scrolling right');
    if (this.projectsContainer && this.projectsContainer.nativeElement) {
      this.projectsContainer.nativeElement.scrollLeft += 200;
    } else {
      console.log('Projects container not available for scrolling right');
    }
  }
}
