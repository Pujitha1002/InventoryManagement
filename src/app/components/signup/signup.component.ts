import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-signup',
  template: `
    <div class="container">
      <div class="card">

        <h1>Inventory Tracker</h1>
        <p>Stock management</p>

        <input placeholder="First Name" required/>
        <input placeholder="Last Name" required/>
        <input placeholder="Email" required/>
        <input placeholder="Phone Number" required/>
        <button (click)="continue()">Create Account</button>

<p style="font-size: 13px; margin: 2;">
  Already have an account? <span (click)="continue()"style="color: grey; text-decoration: underline; cursor: pointer;">Sign in</span></p>


      </div>
    </div>
  `,
styles: [`
.container {
  height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(255,255,255,0.8), transparent 60%),
    radial-gradient(circle at bottom right, rgba(200,200,200,0.3), transparent 60%),
    linear-gradient(135deg, #f6f5f3, #eceae6);
  display: flex;
  justify-content: center;
  align-items: center;
}





.card {
  background: white;
  width: 420px;
  padding: 48px;
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
  margin: 12px 0 32px;
}

input {
  width: 100%;
  padding: 14px;
  margin-bottom: 16px;
  border-radius: 10px;
  border: 1px solid var(--border-light);
  font-size: 14px;
  transition: border 0.2s;
}

input:focus {
  outline: none;
  border-color: var(--charcoal);
}

button {
  width: 100%;
  padding: 14px;
  margin-top: 10px;
  background: var(--charcoal);
  color: white;
  border-radius: 10px;
  border: none;
  font-weight: 500;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

span {
  display: block;
  margin-top: 22px;
  font-size: 14px;
  cursor: pointer;
  color: var(--charcoal);
}
`]

})
export class SignupComponent {
  constructor(private router: Router) {}

  continue() {
    this.router.navigateByUrl('/signin');
  }
}




