import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreProduct, Size } from '../../../models/store-product.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shoes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shoes.component.html',
  styleUrls: ['./shoes.component.css']
})
export class ShoesComponent {
  title = 'Shoes';
  sidebarItems = ['Sneakers', 'Casual', 'Sports'];
  selectedSidebarItem: string | null = null;
  showAddStyle = false;
  newStyle = '';

  sizes: Size[] = ['XS', 'S', 'M', 'L', 'XL'];
  selectedSizeMap = new Map<StoreProduct, Size | null>();

  products: StoreProduct[] = [
    // Sneakers (7)
    { name: 'White Sneakers', category: 'Sneakers', price: 2499, quantityPerSize: { XS: 2, S: 5, M: 6, L: 3, XL: 4 } },
    { name: 'Chunky Sneakers', category: 'Sneakers', price: 2899, quantityPerSize: { XS: 3, S: 4, M: 5, L: 2, XL: 6 } },
    { name: 'Slip-on Sneakers', category: 'Sneakers', price: 2299, quantityPerSize: { XS: 2, S: 3, M: 5, L: 4, XL: 3 } },
    { name: 'High-top Sneakers', category: 'Sneakers', price: 3199, quantityPerSize: { XS: 3, S: 4, M: 6, L: 2, XL: 5 } },
    { name: 'Low-top Sneakers', category: 'Sneakers', price: 1999, quantityPerSize: { XS: 2, S: 5, M: 4, L: 3, XL: 2 } },
    { name: 'Canvas Sneakers', category: 'Sneakers', price: 2099, quantityPerSize: { XS: 3, S: 4, M: 5, L: 2, XL: 3 } },
    { name: 'Sporty Sneakers', category: 'Sneakers', price: 2399, quantityPerSize: { XS: 2, S: 3, M: 5, L: 4, XL: 3 } },

    // Casual (7)
    { name: 'Casual Loafers', category: 'Casual', price: 1999, quantityPerSize: { XS: 3, S: 4, M: 5, L: 2, XL: 6 } },
    { name: 'Canvas Shoes', category: 'Casual', price: 1799, quantityPerSize: { XS: 2, S: 5, M: 4, L: 3, XL: 2 } },
    { name: 'Daily Wear Shoes', category: 'Casual', price: 1899, quantityPerSize: { XS: 3, S: 4, M: 6, L: 2, XL: 5 } },
    { name: 'Walking Shoes', category: 'Casual', price: 2099, quantityPerSize: { XS: 2, S: 3, M: 5, L: 4, XL: 3 } },
    { name: 'Basic Flats', category: 'Casual', price: 1599, quantityPerSize: { XS: 3, S: 5, M: 4, L: 2, XL: 6 } },
    { name: 'Slip-ons', category: 'Casual', price: 1699, quantityPerSize: { XS: 2, S: 4, M: 5, L: 3, XL: 2 } },
    { name: 'Everyday Shoes', category: 'Casual', price: 1999, quantityPerSize: { XS: 3, S: 4, M: 5, L: 2, XL: 3 } },

    // Sports (6)
    { name: 'Running Shoes', category: 'Sports', price: 2999, quantityPerSize: { XS: 2, S: 3, M: 5, L: 4, XL: 3 } },
    { name: 'Gym Trainers', category: 'Sports', price: 2799, quantityPerSize: { XS: 3, S: 4, M: 5, L: 2, XL: 6 } },
    { name: 'Training Shoes', category: 'Sports', price: 2599, quantityPerSize: { XS: 2, S: 5, M: 4, L: 3, XL: 2 } },
    { name: 'Pro Sports Shoes', category: 'Sports', price: 3499, quantityPerSize: { XS: 3, S: 4, M: 6, L: 2, XL: 5 } },
    { name: 'Lightweight Trainers', category: 'Sports', price: 2399, quantityPerSize: { XS: 2, S: 3, M: 5, L: 4, XL: 3 } },
    { name: 'Court Shoes', category: 'Sports', price: 2699, quantityPerSize: { XS: 3, S: 5, M: 4, L: 2, XL: 6 } }
  ];
  addStyle() {
    const style = this.newStyle.trim();
    if (!style) return;

    if (!this.sidebarItems.includes(style)) {
      this.sidebarItems.push(style);
    }

    this.newStyle = '';
    this.showAddStyle = false;
  }

  deleteStyle(style: string) {
    this.sidebarItems = this.sidebarItems.filter(s => s !== style);

    if (this.selectedSidebarItem === style) {
      this.selectedSidebarItem = null;
    }
  }

  get filteredProducts() {
    return this.selectedSidebarItem
      ? this.products.filter(p => p.category === this.selectedSidebarItem)
      : this.products;
  }

  selectSidebarItem(item: string | null) {
    this.selectedSidebarItem = item;
  }

  selectSize(product: StoreProduct, size: Size) {
    this.selectedSizeMap.set(product, size);
  }

  isSizeSelected(product: StoreProduct, size: Size) {
    return this.selectedSizeMap.get(product) === size;
  }

  getQuantity(product: StoreProduct) {
    const selectedSize = this.selectedSizeMap.get(product);
    if (selectedSize) return product.quantityPerSize[selectedSize];
    return Object.values(product.quantityPerSize).reduce((a, b) => a + b, 0);
  }

  isLowStock(product: StoreProduct) {
    return Object.values(product.quantityPerSize).some(q => q < 3);
  }
}
