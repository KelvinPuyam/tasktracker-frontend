import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe(
        () => {
          this.router.navigate(['/home']).then(() => {
            window.location.reload();
          });
        },
        () => {
          this.loginForm.setErrors({ 'invalidLogin': true });
        }
      );
    }
  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }

  navigateToSignup(): void {
    this.router.navigate(['/signup']).then(() => {
      //window.location.reload();
    });
  }
}
