import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreProduct, Size } from '../../../models/store-product.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-accessories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.css']
})
export class AccessoriesComponent {
  title = 'Accessories';
  sidebarItems = ['Bags', 'Caps', 'Belts'];
  selectedSidebarItem: string | null = null;
  showAddStyle = false;
  newStyle = '';

  sizes: Size[] = ['XS', 'S', 'M', 'L', 'XL'];
  selectedSizeMap = new Map<StoreProduct, Size | null>();

  products: StoreProduct[] = [
    // Bags (7)
    { name: 'Sling Bag', category: 'Bags', price: 899, quantityPerSize: { XS: 2, S: 3, M: 5, L: 4, XL: 2 } },
    { name: 'Backpack', category: 'Bags', price: 1499, quantityPerSize: { XS: 3, S: 4, M: 5, L: 2, XL: 6 } },
    { name: 'Tote Bag', category: 'Bags', price: 1299, quantityPerSize: { XS: 2, S: 5, M: 4, L: 3, XL: 2 } },
    { name: 'Travel Bag', category: 'Bags', price: 1999, quantityPerSize: { XS: 3, S: 4, M: 6, L: 2, XL: 5 } },
    { name: 'Mini Bag', category: 'Bags', price: 799, quantityPerSize: { XS: 2, S: 3, M: 5, L: 4, XL: 3 } },
    { name: 'Laptop Bag', category: 'Bags', price: 1799, quantityPerSize: { XS: 3, S: 4, M: 5, L: 2, XL: 3 } },
    { name: 'Gym Bag', category: 'Bags', price: 1599, quantityPerSize: { XS: 2, S: 3, M: 5, L: 4, XL: 3 } },

    // Caps (7)
    { name: 'Baseball Cap', category: 'Caps', price: 499, quantityPerSize: { XS: 2, S: 3, M: 5, L: 4, XL: 2 } },
    { name: 'Snapback Cap', category: 'Caps', price: 599, quantityPerSize: { XS: 3, S: 4, M: 5, L: 2, XL: 6 } },
    { name: 'Bucket Hat', category: 'Caps', price: 549, quantityPerSize: { XS: 2, S: 5, M: 4, L: 3, XL: 2 } },
    { name: 'Visor Cap', category: 'Caps', price: 399, quantityPerSize: { XS: 3, S: 4, M: 6, L: 2, XL: 5 } },
    { name: 'Winter Cap', category: 'Caps', price: 699, quantityPerSize: { XS: 2, S: 3, M: 5, L: 4, XL: 3 } },
    { name: 'Sports Cap', category: 'Caps', price: 579, quantityPerSize: { XS: 3, S: 4, M: 5, L: 2, XL: 3 } },
    { name: 'Fashion Cap', category: 'Caps', price: 649, quantityPerSize: { XS: 2, S: 3, M: 5, L: 4, XL: 3 } },

    // Belts (6)
    { name: 'Leather Belt', category: 'Belts', price: 799, quantityPerSize: { XS: 2, S: 3, M: 5, L: 4, XL: 2 } },
    { name: 'Canvas Belt', category: 'Belts', price: 699, quantityPerSize: { XS: 3, S: 4, M: 5, L: 2, XL: 6 } },
    { name: 'Formal Belt', category: 'Belts', price: 999, quantityPerSize: { XS: 2, S: 5, M: 4, L: 3, XL: 2 } },
    { name: 'Slim Belt', category: 'Belts', price: 649, quantityPerSize: { XS: 3, S: 4, M: 6, L: 2, XL: 5 } },
    { name: 'Wide Belt', category: 'Belts', price: 1099, quantityPerSize: { XS: 2, S: 3, M: 5, L: 4, XL: 3 } },
    { name: 'Designer Belt', category: 'Belts', price: 1199, quantityPerSize: { XS: 3, S: 4, M: 5, L: 2, XL: 3 } }
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
