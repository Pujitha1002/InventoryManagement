import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
            <button>📂 Categories</button>
            <button>🛒 Purchase</button>
            <button>💰 Sale</button>
            <button>📦 Stock</button>
          </div>

          <button class="logout-btn">🚪 Logout</button>
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
    }

    .topbar {
      display: flex;
      align-items: center;
      padding: 15px;
      background: white;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      position: relative;
      z-index: 200;
    }

    .hamburger {
      font-size: 28px;
      cursor: pointer;
      margin-right: 20px;
      padding: 2px 6px;
      border: 2px solid #333;
      border-radius: 6px;
    }

    .title {
      font-size: 24px;
      font-weight: 600;
    }

    .layout-row {
      display: flex;
      height: calc(100vh - 60px);
      width: 100%;
    }

    .sidebar {
      width: 0;
      overflow: hidden;
      transition: width 0.3s ease;
      background: #ffffff;
      border-right: 3px solid transparent;
    }

    .sidebar.open {
      width: 260px;
      border-right-color: #e0e0e0;
    }

    .sidebar-inner {
      height: 100%;
      padding: 20px;
      display: flex;
      flex-direction: column;
    }

    .welcome {
      margin-bottom: 20px;
      font-size: 16px;
      font-weight: 500;
    }

    .menu-buttons {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: auto;
    }

    .menu-buttons button,
    .logout-btn {
      width: 100%;
      padding: 12px;
      border: none;
      background: #f5f5f5;
      border-radius: 10px;
      cursor: pointer;
      font-size: 14px;
      text-align: left;
    }

    .main-wrapper {
      flex: 1;
      overflow: hidden;
    }

    .main-content {
      width: 100%;
      height: 100%;
      overflow-y: auto;
      padding: 20px;
      box-sizing: border-box;
    }

    .big-buttons {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 24px;
      justify-items: center;
      width: 100%;
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
      background: white;
      border: none;
      border-radius: 22px;
      padding: 24px;
      width: 220px;
      height: 220px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: 0.2s ease;
      box-shadow: 0 6px 15px rgba(0,0,0,0.15);
    }

    .cat-item:hover {
      transform: scale(1.05);
    }

    .cat-icon {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      object-fit: cover;
      margin-bottom: 12px;
    }

    .cat-item span {
      font-size: 20px;
      font-weight: 600;
    }

    @media (max-width: 900px) {
      .big-buttons {
        grid-template-columns: repeat(2, minmax(0, 1fr));
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

  @HostListener('document:click')
  clickOutside() {
    this.isMenuOpen = false;
  }
}
