import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { ApiService } from '../../../api.service';
import { User } from '../../main.models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any | null = null;
  isAdmin: boolean = false;

  constructor(private apiService: ApiService, private authService: AuthService) { }

  ngOnInit(): void {
    this.apiService.getUserDetails().subscribe(
      (user: any) => {
        if(user){
        this.user = user;
        this.checkAdminRole(user.id);
        }
      }
    );
  }

  checkAdminRole(id : number): void {
    this.apiService.getRole(id).subscribe(
      (role: any) => {
        const adminRole = role[0].role;
        if (adminRole == "admin") {
          this.isAdmin = true;
        }
      }
    );
  }

  logout(): void {
    this.authService.logout();
  }
}
