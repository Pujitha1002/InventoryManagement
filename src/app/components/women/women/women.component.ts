import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Product {
  name: string;
  size: 'S' | 'M' | 'L';
  price: number;
  quantity: number;
  isLowStock: boolean;
  category: string;
}

@Component({
  selector: 'app-women',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './women.component.html',
  styleUrls: ['./women.component.css']
})
export class WomenComponent {

  sidebarItems: string[] = ['T-shirts', 'Jeans', 'Pants', 'Nightwear'];
  selectedSidebarItem: string | null = null;

  products: Product[] = [
    { name: 'Floral T-shirt', size: 'M', price: 799, quantity: 3, isLowStock: true, category: 'T-shirts' },
    { name: 'Blue Skinny Jeans', size: 'S', price: 1299, quantity: 10, isLowStock: false, category: 'Jeans' },
    { name: 'High Waist Pants', size: 'L', price: 1399, quantity: 5, isLowStock: false, category: 'Pants' },
    { name: 'Cotton Nightwear Set', size: 'M', price: 999, quantity: 2, isLowStock: true, category: 'Nightwear' }
  ];

  get filteredProducts(): Product[] {
    if (!this.selectedSidebarItem) return this.products;
    return this.products.filter(p => p.category === this.selectedSidebarItem);
  }

  selectSidebarItem(item: string | null) {
    this.selectedSidebarItem = item;
  }

  isSizeSelected(product: Product, size: 'S' | 'M' | 'L') {
    return product.size === size;
  }
}
