import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { AuthService } from './auth.service';
import { Task } from './main/main.models';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://127.0.0.1:8000/api';

  private User: any;

  constructor(private http: HttpClient, private authService: AuthService) {

  }

  getProjects(): Observable<any[]> {
    return this.getUserDetails().pipe(
      switchMap(userDetails => {
        console.log(userDetails);
        return this.http.get<any[]>(`${this.baseUrl}/projects/`,{ params: { user_id: userDetails.id.toString() } });
      }),
      catchError(error => {
        console.error('Error fetching user details or projects:', error);
        return of([]);
      })
    );
  }

  getProject(projectId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/projects/${projectId}/`);
  }

  getTasks(): Observable<any[]> {
    return this.getUserDetails().pipe(
      switchMap(userDetails => {
        return this.http.get<any[]>(`${this.baseUrl}/tasks/`,{ params: { user_id: userDetails.id.toString() } });
      }),
      catchError(error => {
        console.error('Error fetching user details or projects:', error);
        return of([]);
      })
    );
  }
  getTask(projectId: number): Observable<any[]> {
    return this.getUserDetails().pipe(
      switchMap(userDetails => {
        return this.http.get<any[]>(`${this.baseUrl}/tasks/?project=${projectId}`,{ params: { user_id: userDetails.id.toString() } });
      }),
      catchError(error => {
        console.error('Error fetching user details or projects:', error);
        return of([]);
      })
    );
  }
  getUserName(id: any): Observable<any>{
    if(id.type=="string"){
      id = parseInt(id, 10);
    }
    return this.http.get<any>(`${this.baseUrl}/users/${id}`);
  }

  getUserDetails(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('auth_token')}`);
    return this.http.get<any>(`${this.baseUrl}/user_details/`, { headers });
  }

  updateProject(projectId: number, project: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/projects/${projectId}/`, project);
  }

  deleteProject(projectId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/projects/${projectId}/`);
  }

  createProject(projectData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/projects/`, projectData);
  }
  createTask(taskData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/tasks/`, taskData);
  }

  getUsers(role?: string): Observable<any[]> {
    if (role) {
      return this.http.get<any[]>(`${this.baseUrl}/users/?role=${role}`);
    }
    return this.http.get<any[]>(`${this.baseUrl}/users`);
  }
  getUserswithoutRole(){
    return this.http.get<any[]>(`${this.baseUrl}/users/?role=no_role`);
  }
  updateUserRole(selectedRoleId: number, selectedUserId: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('auth_token')}`);
    const body = {
      selectedRoleId: selectedRoleId,
      selectedUserId: selectedUserId
    };
    return this.http.post<any>(`${this.baseUrl}/update-user-role/`, body,{headers});
  }

  updateTask(taskId: number, task: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/tasks/${taskId}/`, task);
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/tasks/${taskId}/`);
  }
  getTasksByStatus(status: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/tasks?status=${status}`);
    // Replace 'status' with the parameter your backend expects for filtering by status
  }

  updateTaskStatus(task: Task): Observable<Task> {
    console.log("Hii shiva",task);
    return this.http.put<Task>(`${this.baseUrl}/tasks/${task.id}/`, task);
  }


  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getUsersByProject(projectId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users_by_project/${projectId}`);
  }
  getTasksByProject(projectId:number):Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/tasks_by_project/${projectId}`);
  }

  getRole(id?: number): Observable<any> {
    if(id){
      return this.http.get<any>(`${this.baseUrl}/roles/?userid=${id}`);
    }
    return this.http.get<any>(`${this.baseUrl}/roles/`);
  }

}
