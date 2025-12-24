import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-signin',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="container">
      <div class="card">
        <h1>Inventory Tracker</h1>
        <p>Stock management</p>

        <form [formGroup]="signinForm" (ngSubmit)="login()">

          <!-- PHONE NUMBER -->
          <input
            placeholder="Phone Number"
            formControlName="phone"
          />

          <small *ngIf="isInvalid('phone') && signinForm.get('phone')?.errors?.['required']">
            Phone number is required
          </small>

          <small *ngIf="isInvalid('phone') && signinForm.get('phone')?.errors?.['pattern']">
            Phone number must be 10 digits
          </small>

          <!-- OTP -->
          <input
            placeholder="OTP"
            formControlName="otp"
          />

          <small *ngIf="isInvalid('otp') && signinForm.get('otp')?.errors?.['required']">
            OTP is required
          </small>

          <small *ngIf="isInvalid('otp') && signinForm.get('otp')?.errors?.['pattern']">
            OTP must be 4 digits
          </small>

          <!-- BUTTON UNCHANGED -->
          <button type="submit">Sign In</button>

        </form>

        <!-- SIGN UP LINK (UNCHANGED) -->
        <div class="footer">
          <span>Don't have an account?</span>
          <a routerLink="/signup">Sign Up</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
/* ⚠️ CSS UNCHANGED */
.container {
  height: 100vh;
  // background:
  //   radial-gradient(circle at top left, rgba(255,255,255,0.8), transparent 60%),
  //   radial-gradient(circle at bottom right, rgba(200,200,200,0.3), transparent 60%),
  //   linear-gradient(135deg, #f6f5f3, #eceae6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  background: white;
  width: 400px;
  padding: 46px;
  border-radius: 20px;
  box-shadow: 0 30px 80px rgba(0,0,0,0.12);
  text-align: center;
}

h1 {
  font-family: 'Playfair Display', serif;
  font-size: 30px;
  font-weight: 500;
  letter-spacing: 1.2px;
}

p {
  color: #777;
  margin: 12px 0 30px;
}


input {
  width: 100%;
  padding: 14px;
  margin-top: 14px;
  border-radius: 10px;
  border: 1px solid #ddd;
  font-size: 14px;
  transition: border 0.2s;
}

input:focus {
  outline: none;
  border-color: black;
  border-width:2px;
}

/* Validation text */
small {
  display: block;
  text-align: left;
  font-size: 12px;
  color: black;
  margin-top: 6px;
}

/* Button */
button {
  width: 100%;
  padding: 14px;
  margin-top: 28px;
  background: #222;
  color: #fff;
  border-radius: 10px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

button:disabled {
  background: black;
  cursor: not-allowed;
}

.footer {
  margin-top: 20px;
  display: inline-flex;   /* 🔥 IMPORTANT */
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  font-size: 14px;
}

.footer span,
.footer a {
  display: inline;        /* 🔥 FORCE inline */
  white-space: nowrap;    /* 🔥 PREVENT wrapping */
}

.footer a {
  color: black;
  text-decoration: underline;
  cursor: pointer;
}

.footer a:hover {
  color: #555;
}


`]
})
export class SigninComponent {

  signinForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.signinForm = this.fb.group({
      phone: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/)
      ]],
      otp: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{4}$/)
      ]]
    });
  }

  isInvalid(controlName: string): boolean {
    const control = this.signinForm.get(controlName);
    return !!(control && control.invalid && control.touched);
  }

  login() {
    if (this.signinForm.invalid) {
      this.signinForm.markAllAsTouched();
      return;
    }

    // ✅ API call will go here later
    this.router.navigate(['/dashboard']);
  }

  goSignup() {
    this.router.navigateByUrl('/signup');
  }
}
