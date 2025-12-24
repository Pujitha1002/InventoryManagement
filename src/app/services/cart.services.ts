import { Injectable } from '@angular/core';

export interface CartItem {
    name: string;
    image: string;
    totalQty: number;
    totalPrice: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {

    private cart: CartItem[] = [];

    addToCart(item: CartItem) {
        this.cart.push(item);
    }

    getCart() {
        return this.cart;
    }
}
