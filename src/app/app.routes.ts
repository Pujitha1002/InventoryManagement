import { Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { WomenComponent } from './components/women/women/women.component';
import { MenComponent } from './components/men/men/men.component';
import { KidsComponent } from './components/kids/kids/kids.component';
import { ShoesComponent } from './components/shoes/shoes/shoes.component';
import { AccessoriesComponent } from './components/accessories/accessories/accessories.component';
import { CartComponent } from './components/cart/cart.component';
import { SoldProductsComponent } from './components/sold-products/sold-products.component';
import { SaleComponent } from './components/sale/sale.component';

export const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'purchase', component: PurchaseComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'cart', component: CartComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'sale', component: SaleComponent },
  { path: 'women', component: WomenComponent },
  { path: 'men', component: MenComponent },
  { path: 'kids', component: KidsComponent },
  { path: 'shoes', component: ShoesComponent },
  { path: 'accessories', component: AccessoriesComponent },
  { path: 'sold-products', component: SoldProductsComponent },
  { path: '**', redirectTo: 'signin' }
];
