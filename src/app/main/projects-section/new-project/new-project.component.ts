import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../api.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {
  newProjectForm: FormGroup;
  users: { id: number, username: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ApiService: ApiService,
  ) {
    this.newProjectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      owner: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.ApiService.getUsers("task_creator").subscribe(users => {
      console.log(users);
      this.users = users;
    });
  }

  onSubmit(): void {
    if (this.newProjectForm.valid) {
      const formattedProjectData = {
        ...this.newProjectForm.value,
        start_date: formatDate(this.newProjectForm.value.start_date, 'yyyy-MM-dd', 'en'),
        end_date: formatDate(this.newProjectForm.value.end_date, 'yyyy-MM-dd', 'en')
      };

      this.ApiService.createProject(formattedProjectData).subscribe(
        () => {
          this.router.navigate(['/projects']);
        },
        error => console.error('Error creating project:', error)
      );
    }
  }
}