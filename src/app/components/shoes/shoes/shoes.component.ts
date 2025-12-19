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
  selector: 'app-shoes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shoes.component.html',
  styleUrls: ['./shoes.component.css']
})
export class ShoesComponent {

  sidebarItems = ['Sneakers', 'Heels', 'Flats', 'Sports'];
  selectedSidebarItem: string | null = null;

  products: Product[] = [
    { name: 'White Sneakers', size: 'M', price: 1499, quantity: 2, isLowStock: true, category: 'Sneakers' }
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


