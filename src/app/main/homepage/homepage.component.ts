import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  tasks: any[] = [];
projectOwner: any;
teammates: any[] | null = null;

onTasksReceived(tasks: any[]): void {
  this.tasks = tasks;
}

onTeammatesReceived(data: { projectOwner: any, teammates: any[] | null }): void {
  this.projectOwner = data.projectOwner;
  this.teammates = data.teammates;
}

}
