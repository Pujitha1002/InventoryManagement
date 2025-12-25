import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCard } from '../models/product-card.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'https://localhost:7210/api/Products';

  constructor(private http: HttpClient) {}

  getProductsByCategory(categoryId: number) {
    return this.http.get<{ count: number; products: ProductCard[] }>(
      `${this.baseUrl}/category/${categoryId}`
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
