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
  selector: 'app-men',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './men.component.html',
  styleUrls: ['./men.component.css']
})
export class MenComponent {

  sidebarItems: string[] = ['Shirts', 'T-shirts', 'Jeans', 'Trousers'];
  selectedSidebarItem: string | null = null;

  products: Product[] = [
    { name: 'Formal Shirt', size: 'M', price: 999, quantity: 4, isLowStock: true, category: 'Shirts' },
    { name: 'Casual Tee', size: 'L', price: 599, quantity: 12, isLowStock: false, category: 'T-shirts' }
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


