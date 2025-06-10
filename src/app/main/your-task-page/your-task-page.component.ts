import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Task, User } from '../main.models';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { forkJoin, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-your-task-page',
  templateUrl: './your-task-page.component.html',
  styleUrls: ['./your-task-page.component.css']
})
export class YourTaskPageComponent implements OnInit {
  users: any[] = [];
  newTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  completedTasks: Task[] = [];
  acceptedTasks: Task[] = [];
  isReadOnly: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    const tasks$ = this.apiService.getTasks();
    const users$ = this.apiService.getUsers();
    const userDetails$ = this.apiService.getUserDetails();

    forkJoin([tasks$, users$, userDetails$]).subscribe(([tasks, users, userDetails]) => {
      this.newTasks = tasks.filter(task => task.status === 'new' || task.status === 'not_started');
      this.inProgressTasks = tasks.filter(task => task.status === 'in-progress');
      this.completedTasks = tasks.filter(task => task.status === 'completed');
      this.acceptedTasks = tasks.filter(task => task.status === 'accepted');
      console.log("sabari",this.newTasks);
      this.users = users.reduce((acc, user) => {
        acc[user.id] = user.username;
        console.log(acc);
        return acc;
      }, {});

      this.apiService.getRole(userDetails.id).subscribe((role: any) => {
        const read_only = role[0].role;
        this.isReadOnly.next(read_only === "read_only");
        console.log("isReadOnly initialized:", this.isReadOnly.value);
      });
    });

    this.fetchTasks();
  }
  getUserid(data:User){
    console.log("HUI",data);
    return Number(data);
  }
  fetchTasks(): void {
    this.apiService.getTasks().subscribe(
      (tasks: Task[]) => {
        console.log(tasks);
        this.newTasks = tasks.filter(task => task.status === 'new' || task.status === 'not_started');
        this.inProgressTasks = tasks.filter(task => task.status === 'in-progress');
        this.completedTasks = tasks.filter(task => task.status === 'completed');
        this.acceptedTasks = tasks.filter(task => task.status === 'accepted');
        console.log(this.newTasks);
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  dropMultiList(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const task = event.previousContainer.data[event.previousIndex];
      task.status = this.getStatusForContainer(event.container.id);
      this.apiService.updateTaskStatus(task).subscribe(
        response => {
          transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex
          );
          console.log('Task status updated successfully', response);
          this.fetchTasks(); // Refresh tasks after update
        },
        error => {
          console.error('Error updating task status:', error);
        }
      );
    }
  }

  getStatusForContainer(containerId: string): string {
    switch (containerId) {
      case 'newTasks':
        return 'new'; // 'new' status represents both 'new' and 'not_started'
      case 'inProgressTasks':
        return 'in-progress';
      case 'completedTasks':
        return 'completed';
      case 'acceptedTasks':
        return 'accepted';
      default:
        return '';
    }
  }

  allDropListsExcept(currentListId: string): string[] {
    return ['newTasks', 'inProgressTasks', 'completedTasks', 'acceptedTasks'].filter(id => id !== currentListId);
  }

  ReadonlyPredicate(): (drag: any, drop: any) => boolean {
    return () => !this.isReadOnly.value;
  }
}
