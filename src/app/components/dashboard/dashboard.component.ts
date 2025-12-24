import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StyleService } from '../../services/style.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <!-- Top Bar -->
    <div class="topbar">
      <div class="hamburger" (click)="toggleMenu($event)">☰</div>
      <h1 class="title">Categories</h1>
    </div>

    <!-- Layout -->
    <div class="layout-row">

      <!-- Sidebar -->
      <div class="sidebar"
           [class.open]="isMenuOpen"
           (click)="$event.stopPropagation()">
        <div class="sidebar-inner">
          <p class="welcome">Hi, {{ userName }}</p>

          <div class="menu-buttons">
  <button routerLink="/dashboard">Categories</button>
  <button routerLink="/purchase">Purchase</button>
  <button routerLink="/sale">Sale</button>
  <button>Stock</button>
</div>


<button class="logout-btn" (click)="logout()">🚪 Logout</button>
        </div>
      </div>

      <!-- Main Content -->
      <div class="main-wrapper" (click)="closeMenu()">
        <div class="main-content cute-bg">
          <div class="big-buttons">

            <button class="cat-item" routerLink="/women">
              <img src="assets/women.png" class="cat-icon" />
              <span>Women</span>
            </button>

            <button class="cat-item" routerLink="/men">
              <img src="assets/men.png" class="cat-icon" />
              <span>Men</span>
            </button>

            <button class="cat-item" routerLink="/kids">
              <img src="assets/kids.png" class="cat-icon" />
              <span>Kids</span>
            </button>

            <button class="cat-item" routerLink="/shoes">
              <img src="assets/shoes.png" class="cat-icon" />
              <span>Shoes</span>
            </button>

            <button class="cat-item" routerLink="/accessories">
              <img src="assets/accessories.png" class="cat-icon" />
              <span>Accessories</span>
            </button>

          </div>
        </div>
      </div>

    </div>
  `,
  styles: [`
    /* FONT — SAME AS SIGNUP PAGE */
    * {
      font-family: 'Inter', sans-serif;
      box-sizing: border-box;
    }

    .topbar {
      display: flex;
      align-items: center;
      padding: 16px 24px;
      background: rgba(255,255,255,0.85);
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 18px rgba(0,0,0,0.08);
      position: sticky;
      top:0;
      z-index: 200;
    }

    .hamburger {
      font-size: 26px;
      cursor: pointer;
      margin-right: 20px;
      padding: 4px 10px;
      border: 1px solid #ddd;
      border-radius: 10px;
      background: white;
    }

    .title {
      font-size: 26px;
      font-weight: 600;
    }

    .layout-row {
      display: flex;
      height: calc(100vh - 60px);
    }

    .sidebar {
      width: 0;
      overflow: hidden;
      transition: width 0.35s ease;
      // background: #ffffff;
      box-shadow: 10px 0 30px rgba(0,0,0,0.1);
    }

    .sidebar.open {
      width: 260px;
      // border-right-color: #e0e0e0;
    }

    .sidebar-inner {
      height: 100%;
      padding: 30px 20px;
      display: flex;
      flex-direction: column;
    }

    .welcome {
      margin-bottom: 30px;
      font-size: 16px;
      font-weight: 500;
    }

    .menu-buttons {
      display: flex;
      flex-direction: column;
      gap: 14px;
      margin-bottom: auto;
    }

    .menu-buttons button,
    .logout-btn {
      padding: 14px;
      border: none;
      background: #f5f5f5;
      border-radius: 14px;
      box-shadow: 0 6px 15px rgba(0,0,0,0.08);
      cursor: pointer;
      font-size: 14px;
      text-align: left;
    }

    .main-wrapper {
      flex: 1;
      overflow: hidden;
    }

    .main-content {
      height: 100%;
      overflow-y: auto;
      padding: 50px 40px;
    }

    .big-buttons {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 40px;
      justify-items: center;
      margin-top: 40px;
    }

    .big-buttons button:nth-child(4) {
      grid-column: 1 / 3;
      grid-row: 2;
    }

    .big-buttons button:nth-child(5) {
      grid-column: 2 / 4;
      grid-row: 2;
    }

    .cat-item {
      // background: white;
      border: none;
      border-radius: 26px;
      padding: 28px;
      width: 240px;
      height: 240px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: transform 0.35s ease, box-shadow 0.35s ease;
      box-shadow: 0 20px 50px rgba(0,0,0,0.15);
    }

    .cat-item:hover {
      transform: translateY(-8px);
      box-shadow: 0 35px 70px rgba(0,0,0,0.22);
    }

    .cat-icon {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      object-fit: cover;
      margin-bottom: 16px;
      padding:16px;
    }

    .cat-item span {
      font-size: 20px;
      font-weight: 600;
    }

        :host {
      display: block;
      height: 100vh;
      // background: linear-gradient(
      //   135deg,
      //   #faf9f7 0%,
      //   #f1ede7 50%,
      //   #e6dfd5 100%
      // );
    }

    @media (max-width: 900px) {
      .big-buttons {
        grid-template-columns: repeat(2, 1fr);
      }
      .big-buttons button:nth-child(4),
      .big-buttons button:nth-child(5) {
        grid-column: auto;
        grid-row: auto;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  userName = 'Guest';
  isMenuOpen = false;
  sidebarOpen = false;
  showAddStyle = false;
  newStyle = '';
  styles: string[] = ['All', 'Tops', 'Dresses', 'Jeans', 'Jackets'];

  constructor(private styleService: StyleService, private router: Router) { }
  ngOnInit() {
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      this.userName = storedUser;
    }
  }

  toggleMenu(event: Event) {
    event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
  logout() {
    // optional: clear storage later if you want
    // localStorage.clear();
    // sessionStorage.clear();

    localStorage.clear();   // optional but recommended
    this.router.navigate(['/signin']); // or '/signin'
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  addStyle() {
    if (!this.newStyle.trim()) return;

    this.styles.push(this.newStyle.trim());
    this.newStyle = '';
  }


  @HostListener('document:click')
  clickOutside() {
    this.isMenuOpen = false;
  }
  close() {
    this.sidebarOpen = false;
  }
}
