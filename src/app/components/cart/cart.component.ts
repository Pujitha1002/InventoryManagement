import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartItem, CartService } from '../../services/cart.services';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent {
    constructor(public cartService: CartService, private router: Router) { }
    get items(): CartItem[] {
        return this.cartService.getCart();
    }
    back() {
        this.router.navigate(['/purchase']);
    }
    increase(item: CartItem) {
        this.cartService.increaseQty(item);
    }
    decrease(item: CartItem) {
        this.cartService.decreaseQty(item);
    }
    remove(item: CartItem) {
        this.cartService.removeItem(item);
    }
    get total() {
        return this.cartService.getCartTotal();
    }
}
