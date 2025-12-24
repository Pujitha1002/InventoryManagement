import { Injectable } from '@angular/core';

export interface StoreProduct {
    name: string;
    category: string;
    price: number;
    image: string;
    quantityPerSize?: Record<string, number>;
}

@Injectable({ providedIn: 'root' })
export class InventoryService {

    products: StoreProduct[] = [
        {
            name: 'Crop Top',
            category: 'Women',
            price: 499,
            image: 'assets/women.png',
            quantityPerSize: { XS: 0, S: 0, M: 0, L: 0, XL: 0 }
        },
        {
            name: 'Running Shoes',
            category: 'Shoes',
            price: 2499,
            image: 'assets/shoes.png',
            quantityPerSize: { '6': 0, '7': 0, '8': 0, '9': 0, '10': 0 }
        }
    ];

    getProducts() {
        return this.products;
    }

    addProduct(product: StoreProduct) {
        this.products.push(product);
    }
}
