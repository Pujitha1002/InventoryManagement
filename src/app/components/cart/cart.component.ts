import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { CartItem, CartService } from '../../services/cart.services';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    userName = 'Guest';
    isMenuOpen = false;
    cart: CartItem[] = [];

    constructor(private cartService: CartService) { }

    ngOnInit() {
        const storedUser = localStorage.getItem('username');
        if (storedUser) this.userName = storedUser;

        // ✅ THIS IS THE IMPORTANT LINE
        this.cart = this.cartService.getCart();
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
