import { Injectable } from '@angular/core';
import { Product } from '../models/Product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      productId: 1,
      productName: 'Laptop',
      categoryName: 'Electronics',
      price: 50000,
      quantity: 5,
      productDetails: 'High-end gaming laptop',
      createdDate: new Date()
    },
    {
      productId: 2,
      productName: 'Mouse',
      categoryName: 'Electronics',
      price: 500,
      quantity: 20,
      productDetails: 'Wireless mouse',
      createdDate: new Date()
    }
  ];

  constructor() {}

  getProducts(): Product[] {
    return this.products;
  }

  addProduct(product: Product) {
    this.products.push(product);
  }

  updateProduct(updatedProduct: Product) {
    const index = this.products.findIndex(p => p.productId === updatedProduct.productId);
    if (index !== -1) this.products[index] = updatedProduct;
  }

  deleteProduct(productId: number) {
    this.products = this.products.filter(p => p.productId !== productId);
  }
}
