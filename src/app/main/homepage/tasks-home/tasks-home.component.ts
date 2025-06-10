import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tasks-home',
  templateUrl: './tasks-home.component.html',
  styleUrl: './tasks-home.component.css'
})
export class TasksHomeComponent {

  @Input() tasks: any[] = [];

}
