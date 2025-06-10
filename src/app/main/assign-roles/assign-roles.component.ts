import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-assign-roles',
  templateUrl: './assign-roles.component.html',
  styleUrls: ['./assign-roles.component.css']
})
export class AssignRolesComponent implements OnInit {
  roles: any[] = [];
  users: any[] = [];
  selectedRoleId: number | null = null;
  selectedUserId: number | null = null;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadRoles();
    this.loadUsers();
  }

  loadRoles(): void {
    this.roles = [
      { id: 1, name: 'Admin' },
      { id: 2, name: 'Task Creator' },
      { id: 3, name: 'Read Only' }
    ];
  }

  loadUsers(): void {
    this.apiService.getUserswithoutRole().subscribe(
      users => {
        this.users = users;
        console.log(users);
      },
      error => console.error('Error fetching users', error)
    );
  }

  assignRole(): void {
    if (this.selectedRoleId && this.selectedUserId) {
      this.apiService.updateUserRole(this.selectedRoleId, this.selectedUserId).subscribe(
        response => {
          console.log('Role assigned successfully', response);
          alert('Role Assigned Successfully!');
          location.reload();
        },
        error => {
          console.error('Error assigning role', error);
        }
      );
    } else {
      console.error('Role ID or User ID is missing');
    }
  }
}
