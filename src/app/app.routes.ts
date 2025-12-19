import { Routes } from '@angular/router';

/* AUTH */
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';

/* DASHBOARD */
import { DashboardComponent } from './components/dashboard/dashboard.component';

/* CATEGORIES */
import { WomenComponent } from './components/women/women/women.component';
import { MenComponent } from './components/men/men/men.component';
import { KidsComponent } from './components/kids/kids/kids.component';
import { ShoesComponent } from './components/shoes/shoes/shoes.component';
import { AccessoriesComponent } from './components/accessories/accessories/accessories.component';

export const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },

  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },

  { path: 'dashboard', component: DashboardComponent },

  { path: 'women', component: WomenComponent },
  { path: 'men', component: MenComponent },
  { path: 'kids', component: KidsComponent },
  { path: 'shoes', component: ShoesComponent },
  { path: 'accessories', component: AccessoriesComponent },

  { path: '**', redirectTo: 'signin' }
];
