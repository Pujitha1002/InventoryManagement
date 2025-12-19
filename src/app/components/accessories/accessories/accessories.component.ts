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
  selector: 'app-accessories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.css']
})
export class AccessoriesComponent {

  sidebarItems = ['Bags', 'Jewellery', 'Belts', 'Scarves'];
  selectedSidebarItem: string | null = null;

  products: Product[] = [
    { name: 'Leather Belt', size: 'M', price: 699, quantity: 5, isLowStock: false, category: 'Belts' }
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


