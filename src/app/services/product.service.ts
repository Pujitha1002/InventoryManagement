import { Injectable } from '@angular/core';
import { InventoryProduct } from '../models/inventory-product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {

  products: InventoryProduct[] = [
    {
      productId: 1,
      productName: 'Plain T-shirt',
      categoryName: 'Men',
      price: 499,
      quantity: 20
    },
    {
      productId: 2,
      productName: 'Floral Dress',
      categoryName: 'Women',
      price: 1099,
      quantity: 10
    }
  ];

  getProducts() {
    return this.products;
  }

  deleteProduct(productId: number) {
    this.products = this.products.filter(p => p.productId !== productId);
  }
}
