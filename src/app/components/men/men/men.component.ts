import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreProduct, Size } from '../../../models/store-product.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-men',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './men.component.html',
  styleUrls: ['./men.component.css']
})
export class MenComponent {
  title = 'Men';
  sidebarItems = ['T-shirts', 'Shirts', 'Jeans', 'Jackets'];
  selectedSidebarItem: string | null = null;
  showAddStyle = false;
  newStyle = '';
  isMenuOpen = false;
  sidebarOpen = false;

  sizes: Size[] = ['XS', 'S', 'M', 'L', 'XL'];
  selectedSizeMap = new Map<StoreProduct, Size | null>();

  products: StoreProduct[] = [
    // T-shirts (5)
    { name: 'Plain Tee', category: 'T-shirts', price: 499, quantityPerSize: { XS: 3, S: 4, M: 5, L: 2, XL: 6 } },
    { name: 'Graphic Tee', category: 'T-shirts', price: 599, quantityPerSize: { XS: 2, S: 5, M: 6, L: 3, XL: 4 } },
    { name: 'V-neck Tee', category: 'T-shirts', price: 449, quantityPerSize: { XS: 5, S: 3, M: 4, L: 2, XL: 5 } },
    { name: 'Oversized Tee', category: 'T-shirts', price: 699, quantityPerSize: { XS: 3, S: 4, M: 5, L: 2, XL: 3 } },
    { name: 'Slim Fit Tee', category: 'T-shirts', price: 399, quantityPerSize: { XS: 2, S: 5, M: 6, L: 3, XL: 2 } },

    // Shirts (5)
    { name: 'Formal Shirt', category: 'Shirts', price: 899, quantityPerSize: { XS: 2, S: 4, M: 5, L: 3, XL: 6 } },
    { name: 'Checked Shirt', category: 'Shirts', price: 999, quantityPerSize: { XS: 3, S: 5, M: 4, L: 2, XL: 3 } },
    { name: 'Linen Shirt', category: 'Shirts', price: 799, quantityPerSize: { XS: 2, S: 3, M: 5, L: 4, XL: 2 } },
    { name: 'Oxford Shirt', category: 'Shirts', price: 949, quantityPerSize: { XS: 4, S: 2, M: 5, L: 3, XL: 4 } },
    { name: 'Denim Shirt', category: 'Shirts', price: 849, quantityPerSize: { XS: 3, S: 4, M: 6, L: 2, XL: 3 } },

    // Jeans (5)
    { name: 'Slim Jeans', category: 'Jeans', price: 1299, quantityPerSize: { XS: 2, S: 5, M: 6, L: 4, XL: 3 } },
    { name: 'Regular Jeans', category: 'Jeans', price: 1199, quantityPerSize: { XS: 3, S: 3, M: 4, L: 5, XL: 2 } },
    { name: 'Ripped Jeans', category: 'Jeans', price: 1399, quantityPerSize: { XS: 4, S: 2, M: 5, L: 3, XL: 4 } },
    { name: 'Black Jeans', category: 'Jeans', price: 1449, quantityPerSize: { XS: 3, S: 4, M: 6, L: 2, XL: 5 } },
    { name: 'Cargo Jeans', category: 'Jeans', price: 1249, quantityPerSize: { XS: 2, S: 5, M: 3, L: 4, XL: 2 } },

    // Jackets (5)
    { name: 'Denim Jacket', category: 'Jackets', price: 1499, quantityPerSize: { XS: 3, S: 5, M: 4, L: 3, XL: 2 } },
    { name: 'Bomber Jacket', category: 'Jackets', price: 1799, quantityPerSize: { XS: 2, S: 3, M: 5, L: 4, XL: 6 } },
    { name: 'Hooded Jacket', category: 'Jackets', price: 1599, quantityPerSize: { XS: 4, S: 2, M: 5, L: 3, XL: 4 } },
    { name: 'Leather Jacket', category: 'Jackets', price: 2499, quantityPerSize: { XS: 3, S: 4, M: 6, L: 2, XL: 3 } },
    { name: 'Windcheater', category: 'Jackets', price: 1899, quantityPerSize: { XS: 2, S: 3, M: 5, L: 4, XL: 2 } }
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
    if (selectedSize) {
      return product.quantityPerSize[selectedSize];
    } else {
      return Object.values(product.quantityPerSize).reduce((a, b) => a + b, 0);
    }
  }

  isLowStock(product: StoreProduct) {
    return Object.values(product.quantityPerSize).some(q => q < 3);
  }
  toggleMenu(event: Event) {
    event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
  }
  closeMenu() {
    this.isMenuOpen = false;
  }
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
