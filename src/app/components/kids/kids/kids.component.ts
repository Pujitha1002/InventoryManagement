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
  selector: 'app-kids',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kids.component.html',
  styleUrls: ['./kids.component.css']
})
export class KidsComponent {

  sidebarItems = ['Tops', 'Bottoms', 'Frocks', 'Sets'];
  selectedSidebarItem: string | null = null;

  products: Product[] = [
    { name: 'Cartoon Tee', size: 'S', price: 499, quantity: 3, isLowStock: true, category: 'Tops' }
  ];

  get filteredProducts() {
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

