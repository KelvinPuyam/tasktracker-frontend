import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../api.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  editProjectForm: FormGroup;
  projectId!: number;
  users: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {
    this.editProjectForm = this.fb.group({
      name: [''],
      description: [''],
      start_date: [''],
      end_date: [''],
      owner: ['']
    });
  }

  ngOnInit(): void {
    this.projectId = +this.route.snapshot.paramMap.get('id')!;
    this.apiService.getProject(this.projectId).subscribe((project: any) => {
      project.start_date = new Date(project.start_date);
      project.end_date = new Date(project.end_date);
      this.editProjectForm.patchValue(project);
    });

    this.apiService.getUsers().subscribe((users: any[]) => {
      this.users = users;
    });
  }

  onSubmit(): void {
    if (this.editProjectForm.valid) {
      const formValue = this.editProjectForm.value;
      formValue.start_date = formatDate(formValue.start_date, 'yyyy-MM-dd', 'en');
      formValue.end_date = formatDate(formValue.end_date, 'yyyy-MM-dd', 'en');
      this.apiService.updateProject(this.projectId, formValue).subscribe(() => {
        this.router.navigate(['/projects']);
      });
    }
  }
}
