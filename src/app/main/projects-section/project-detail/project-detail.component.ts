import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  project: any = {};
  users: any = {};

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    const projectId = +this.route.snapshot.paramMap.get('id')!;

    this.apiService.getProject(projectId).subscribe((data: any) => {
      this.project = data;

      this.apiService.getUsers().subscribe((users: any[]) => {
        this.users = users.reduce((acc, user) => {
          acc[user.id] = user.username;
          return acc;
        }, {});

        this.project.owner = this.users[this.project.owner] || 'Unknown';
      });
    });
  }
}
