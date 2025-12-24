import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreProduct, Size } from '../../../models/store-product.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-kids',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './kids.component.html',
  styleUrls: ['./kids.component.css']
})
export class KidsComponent {
  title = 'Kids';
  sidebarItems = ['T-shirts', 'Shorts', 'Dresses', 'Winterwear'];
  selectedSidebarItem: string | null = null;
  showAddStyle = false;
  newStyle = '';

  sizes: Size[] = ['XS', 'S', 'M', 'L', 'XL'];
  selectedSizeMap = new Map<StoreProduct, Size | null>();

  products: StoreProduct[] = [
    // T-shirts (5)
    { name: 'Cartoon Tee', category: 'T-shirts', price: 399, quantityPerSize: { XS: 3, S: 4, M: 5, L: 2, XL: 6 } },
    { name: 'Printed Tee', category: 'T-shirts', price: 449, quantityPerSize: { XS: 2, S: 5, M: 6, L: 3, XL: 4 } },
    { name: 'Striped Tee', category: 'T-shirts', price: 499, quantityPerSize: { XS: 4, S: 3, M: 5, L: 2, XL: 5 } },
    { name: 'Graphic Tee', category: 'T-shirts', price: 529, quantityPerSize: { XS: 3, S: 4, M: 5, L: 2, XL: 3 } },
    { name: 'Superhero Tee', category: 'T-shirts', price: 559, quantityPerSize: { XS: 2, S: 5, M: 6, L: 3, XL: 2 } },

    // Shorts (5)
    { name: 'Denim Shorts', category: 'Shorts', price: 599, quantityPerSize: { XS: 2, S: 3, M: 5, L: 4, XL: 2 } },
    { name: 'Cotton Shorts', category: 'Shorts', price: 549, quantityPerSize: { XS: 3, S: 5, M: 6, L: 2, XL: 4 } },
    { name: 'Play Shorts', category: 'Shorts', price: 579, quantityPerSize: { XS: 2, S: 4, M: 5, L: 3, XL: 2 } },
    { name: 'Printed Shorts', category: 'Shorts', price: 499, quantityPerSize: { XS: 4, S: 3, M: 6, L: 2, XL: 5 } },
    { name: 'Sport Shorts', category: 'Shorts', price: 629, quantityPerSize: { XS: 3, S: 5, M: 4, L: 2, XL: 3 } },

    // Dresses (5)
    { name: 'Floral Dress', category: 'Dresses', price: 999, quantityPerSize: { XS: 3, S: 4, M: 5, L: 2, XL: 6 } },
    { name: 'Party Dress', category: 'Dresses', price: 1199, quantityPerSize: { XS: 2, S: 5, M: 6, L: 3, XL: 4 } },
    { name: 'Casual Dress', category: 'Dresses', price: 899, quantityPerSize: { XS: 4, S: 3, M: 5, L: 2, XL: 5 } },
    { name: 'Summer Dress', category: 'Dresses', price: 799, quantityPerSize: { XS: 3, S: 4, M: 5, L: 2, XL: 3 } },
    { name: 'Frock Dress', category: 'Dresses', price: 1299, quantityPerSize: { XS: 2, S: 5, M: 6, L: 3, XL: 2 } },

    // Winterwear (5)
    { name: 'Hoodie', category: 'Winterwear', price: 999, quantityPerSize: { XS: 3, S: 5, M: 4, L: 3, XL: 2 } },
    { name: 'Sweatshirt', category: 'Winterwear', price: 1099, quantityPerSize: { XS: 2, S: 3, M: 5, L: 4, XL: 6 } },
    { name: 'Jacket', category: 'Winterwear', price: 1499, quantityPerSize: { XS: 4, S: 2, M: 5, L: 3, XL: 4 } },
    { name: 'Pullover', category: 'Winterwear', price: 899, quantityPerSize: { XS: 3, S: 4, M: 6, L: 2, XL: 3 } },
    { name: 'Cardigan', category: 'Winterwear', price: 849, quantityPerSize: { XS: 2, S: 3, M: 5, L: 4, XL: 2 } }
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
}
