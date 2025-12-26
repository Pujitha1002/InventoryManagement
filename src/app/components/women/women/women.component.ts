import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreProduct, Size } from '../../../models/store-product.model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-women',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './women.component.html',
  styleUrls: ['./women.component.css']
})
export class WomenComponent {
  title = 'Women';
  sidebarItems = ['Tops', 'Dresses', 'Jeans', 'Jackets'];
  selectedSidebarItem: string | null = null;

  editingProduct: StoreProduct | null = null;
  newPrice = 0;

  sizes: Size[] = ['XS', 'S', 'M', 'L', 'XL'];

  selectedSizeMap = new Map<StoreProduct, Size | null>();

  products: StoreProduct[] = [
    // Tops (5)
    { name: 'Crop Top', category: 'Tops', price: 499, quantityPerSize: { XS: 3, S: 4, M: 5, L: 2, XL: 6 } },
    { name: 'Oversized Top', category: 'Tops', price: 599, quantityPerSize: { XS: 2, S: 5, M: 6, L: 4, XL: 3 } },
    { name: 'Ribbed Top', category: 'Tops', price: 449, quantityPerSize: { XS: 5, S: 6, M: 5, L: 2, XL: 4 } },
    { name: 'Wrap Top', category: 'Tops', price: 549, quantityPerSize: { XS: 4, S: 3, M: 5, L: 3, XL: 5 } },
    { name: 'Peplum Top', category: 'Tops', price: 649, quantityPerSize: { XS: 3, S: 2, M: 6, L: 4, XL: 2 } },

    // Dresses (5)
    { name: 'Floral Dress', category: 'Dresses', price: 1199, quantityPerSize: { XS: 2, S: 5, M: 6, L: 3, XL: 4 } },
    { name: 'Maxi Dress', category: 'Dresses', price: 1399, quantityPerSize: { XS: 3, S: 4, M: 5, L: 2, XL: 3 } },
    { name: 'Bodycon Dress', category: 'Dresses', price: 999, quantityPerSize: { XS: 5, S: 3, M: 4, L: 3, XL: 2 } },
    { name: 'Party Dress', category: 'Dresses', price: 1599, quantityPerSize: { XS: 4, S: 6, M: 5, L: 2, XL: 3 } },
    { name: 'Summer Dress', category: 'Dresses', price: 1299, quantityPerSize: { XS: 3, S: 4, M: 3, L: 5, XL: 6 } },

    // Jeans (5)
    { name: 'High Waist Jeans', category: 'Jeans', price: 1499, quantityPerSize: { XS: 2, S: 5, M: 6, L: 4, XL: 3 } },
    { name: 'Straight Jeans', category: 'Jeans', price: 1399, quantityPerSize: { XS: 3, S: 3, M: 4, L: 5, XL: 2 } },
    { name: 'Skinny Jeans', category: 'Jeans', price: 1299, quantityPerSize: { XS: 4, S: 2, M: 5, L: 3, XL: 4 } },
    { name: 'Wide Leg Jeans', category: 'Jeans', price: 1599, quantityPerSize: { XS: 3, S: 4, M: 6, L: 2, XL: 5 } },
    { name: 'Cargo Jeans', category: 'Jeans', price: 1699, quantityPerSize: { XS: 2, S: 5, M: 3, L: 4, XL: 2 } },

    // Jackets (5)
    { name: 'Denim Jacket', category: 'Jackets', price: 1899, quantityPerSize: { XS: 3, S: 5, M: 4, L: 3, XL: 2 } },
    { name: 'Cropped Jacket', category: 'Jackets', price: 1799, quantityPerSize: { XS: 2, S: 3, M: 5, L: 4, XL: 6 } },
    { name: 'Leather Jacket', category: 'Jackets', price: 2499, quantityPerSize: { XS: 4, S: 2, M: 5, L: 3, XL: 4 } },
    { name: 'Winter Coat', category: 'Jackets', price: 2999, quantityPerSize: { XS: 3, S: 4, M: 3, L: 2, XL: 5 } },
    { name: 'Blazer Jacket', category: 'Jackets', price: 2199, quantityPerSize: { XS: 2, S: 3, M: 5, L: 4, XL: 3 } }
  ];
  constructor(private router: Router, private productService: ProductService) { }

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
      // total quantity if no size selected
      return Object.values(product.quantityPerSize).reduce((a, b) => a + b, 0);
    }
  }
  // 🔹 ADD STYLE METHOD (ADDED)
  addStyle() {
    if (!this.newStyle.trim()) return;

    // avoid duplicates
    if (!this.sidebarItems.includes(this.newStyle.trim())) {
      this.sidebarItems.push(this.newStyle.trim());
    }

    this.newStyle = '';
    this.showAddStyle = false;
  }
  // 🔹 DELETE STYLE (ADDED)
  deleteStyle(style: string) {
    this.sidebarItems = this.sidebarItems.filter(item => item !== style);

    // reset selection if deleted style was selected
    if (this.selectedSidebarItem === style) {
      this.selectedSidebarItem = null;
    }
  }


  isLowStock(product: StoreProduct) {
    return Object.values(product.quantityPerSize).some(q => q < 3);
  }

  logout() {
    localStorage.clear(); // optional but good
    this.router.navigate(['/signin']);
  }

  removeProduct(product: StoreProduct) {
    const confirmDelete = confirm(`Remove ${product.name}?`);
    if (!confirmDelete) return;

    this.products = this.products.filter(p => p !== product);
  }

  updatePrice() {
    if (!this.editingProduct || this.newPrice <= 0) return;

    this.editingProduct.price = this.newPrice;
    this.editingProduct = null;
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
  openMenu(product: StoreProduct) {
    this.activeMenu = this.activeMenu === product ? null : product;
  }

  openUpdatePrice(product: StoreProduct) {
    this.editingProduct = product;
    this.newPrice = product.price;
    this.activeMenu = null;
  }

  activeMenu: StoreProduct | null = null;
  isMenuOpen = false;
  sidebarOpen = false;
  // 🔹 ADD STYLE FEATURE (ADDED)
  showAddStyle = false;
  newStyle = '';

}
