import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  hide = true;
  hideConfirm = true;
  accountCreated = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) 
  
  {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')!.value === form.get('confirmPassword')!.value
      ? null : { 'passwordMismatch': true };
  }

  onSubmit(): void {
    const { username, firstName, lastName, email, password } = this.signupForm.value;

      this.authService.signup({ username, 
        first_name: firstName, 
        last_name: lastName,
        email, 
        password }).subscribe(
        response => {
          this.accountCreated = true;
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error => {
            console.error('Error creating account', error);
        }
      );
    }
    
}
