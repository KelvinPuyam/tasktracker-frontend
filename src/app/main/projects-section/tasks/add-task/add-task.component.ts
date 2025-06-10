import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { formatDate } from '@angular/common';
import { ApiService } from '../../../../api.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  newTaskForm: FormGroup;
  users: any[] = [];
  projects: any[] = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.newTaskForm = this.fb.group({
      project: [this.data.projectId, Validators.required],
      description: ['', Validators.required],
      due_date: ['', Validators.required],
      status: ['new', Validators.required],
      owner: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.apiService.getUsers("read_only").subscribe(users => {
      this.users = users;
    });

    this.apiService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
  }

  onSubmit(): void {
    if (this.newTaskForm.valid) {
      let formattedTaskData = { ...this.newTaskForm.value };

      if (this.newTaskForm.value.due_date) {
        formattedTaskData.due_date = formatDate(this.newTaskForm.value.due_date, 'yyyy-MM-dd', 'en');
      }

      this.dialogRef.close(formattedTaskData);
    }
  }
}
