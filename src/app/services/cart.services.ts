import { Injectable } from '@angular/core';

export interface CartItem {
    name: string;
    image: string;
    qty: number;
    unitPrice: number;        // price per item
    total: number;        // qty * price
}
@Injectable({ providedIn: 'root' })
export class CartService {

    private cart: CartItem[] = [];

    getCart() {
        return this.cart;
    }

    addToCart(item: { name: string; image: string; totalQty: number; totalPrice: number }) {

        const existing = this.cart.find(c => c.name === item.name);

        if (existing) {
            existing.qty += item.totalQty;
            existing.total = existing.qty * existing.unitPrice;
        } else {
            this.cart.push({
                name: item.name,
                image: item.image,
                qty: item.totalQty,
                unitPrice: item.totalPrice / item.totalQty, // price per item
                total: item.totalPrice
            });
        }
    }

    increaseQty(item: CartItem) {
        item.qty++;
        item.total = item.qty * item.unitPrice;
    }

    decreaseQty(item: CartItem) {
        if (item.qty > 1) {
            item.qty--;
            item.total = item.qty * item.unitPrice;
        }
    }

    removeItem(item: CartItem) {
        this.cart = this.cart.filter(c => c !== item);
    }

    getCartTotal() {
        return this.cart.reduce((sum, i) => sum + i.total, 0);
    }
}
