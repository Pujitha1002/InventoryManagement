import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', [
        Validators.required,
        Validators.pattern('^[A-Za-z ]+$')
      ]],
      lastName: ['', [
        // Validators.required,
        Validators.pattern('^[A-Za-z ]+$')
      ]],
      email: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@gmail\\.com$')
      ]],
      phone: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ]]
    });
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    const payload = {
      firstName: this.signupForm.value.firstName,
      lastName: this.signupForm.value.lastName,
      email: this.signupForm.value.email,
      phoneNumber: this.signupForm.value.phone
    };

    this.authService.register(payload).subscribe({
      next: () => {
        this.router.navigate(['/signin']);
      },
      error: (err) => {
        if (err.status === 409) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Something went wrong';
        }
      }
    });
  }
}
