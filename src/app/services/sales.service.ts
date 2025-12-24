import { Injectable } from '@angular/core';

export interface SoldProduct {
    productName: string;
    category: string;
    style: string;
    size: string;
    quantity: number;
    price: number;
    total: number;
}

@Injectable({
    providedIn: 'root'
})
export class SalesService {
    private soldProducts: SoldProduct[] = [];

    add(product: SoldProduct) {
        this.soldProducts.push(product);
    }

    getAll(): SoldProduct[] {
        return this.soldProducts;
    }
}
