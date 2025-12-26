import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InventoryProduct } from '../models/inventory-product.model';
import { Product } from './product';
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
  setProducts(products: InventoryProduct[]) {
    this.products = products;
  }
  getProducts() {
    return this.products;
  }
  getLowStockProducts() {
    return this.products.flatMap(product =>
      Object.entries(product.quantity || {})
        .filter(([_, qty]) => qty < 3)
        .map(([size, qty]) => ({
          category: product.categoryName,
          product: product.productName,
          size,
          qty
        }))
    );
  }

  getProductsByStyle(styleId: number) {
    return this.http.get<{ count: number; products: ProductCard[] }>(
      `${this.baseUrl}/style/${styleId}`
    );
  }

  // ✅ FIXED URL + field name
  getStylesByCategory(categoryId: number) {
    return this.http.get<{ styleId: number; name: string }[]>(
      `${this.baseUrl}/styles/category/${categoryId}`
    );
  }

  // ✅ FIXED URL
  addStyle(data: { name: string; categoryId: number }) {
    return this.http.post(
      `${this.baseUrl}/styles`,
      data
    );
  }
  updateProductPrice(productId: number, newPrice: number) {
    return this.http.put(
      `${this.baseUrl}/${productId}/price`,
      newPrice
    );
  }

}
