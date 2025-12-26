import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
<<<<<<< HEAD
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
=======
import { ProductService } from '../../../services/product.service';
import { ProductCard } from '../../../models/product-card.model';
>>>>>>> fc186d73f90128e525338518d02e7f943e429786

@Component({
  selector: 'app-women',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './women.component.html',
  styleUrls: ['./women.component.css']
})
export class WomenComponent implements OnInit {

  title = 'Women';
  headingCount = 0;

  sidebarItems: { styleId: number; name: string }[] = [];
  newStyle = '';
  showAddStyle = false;
  selectedStyleId: number | null = null;

  products: ProductCard[] = [];

  sizes: string[] = ['XS', 'S', 'M', 'L', 'XL'];
  selectedSizeMap = new Map<number, string>();

  // menu & modal
  activeMenu: ProductCard | null = null;
  editingProduct: ProductCard | null = null;
  newPrice = 0;

  // sidebar
  isMenuOpen = false;
  

  constructor(private productService: ProductService) {}

<<<<<<< HEAD
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
=======
  ngOnInit(): void {
    this.loadStyles();
    this.loadAllProducts();
>>>>>>> fc186d73f90128e525338518d02e7f943e429786
  }

  // ================= SIDEBAR =================

  loadStyles(): void {
    this.productService.getStylesByCategory(1).subscribe(res => {
      // ✅ FIX: map correct response shape
      this.sidebarItems = res;
    });
  }

  loadAllProducts(): void {
    this.selectedStyleId = null;

    this.productService.getProductsByCategory(1).subscribe((res: any) => {
      // ✅ FIX: assign correctly
      this.products = res.products.map((p: ProductCard) => ({
        ...p,
        imageUrl: `https://localhost:7210${p.imageUrl}`
    }));
      this.headingCount = res.products.length;
      this.title = 'Women';
    });
  }
  


  selectStyle(style: { styleId: number; name: string }): void {
  this.selectedStyleId = style.styleId;

  this.productService.getProductsByStyle(style.styleId).subscribe((res: any) => {
    this.products = res.products.map((p: ProductCard) => ({
      ...p,
      imageUrl: `https://localhost:7210${p.imageUrl}`
    }));

    this.headingCount = res.products.length;
    this.title = style.name;
  });
}


  // ================= SIZE & QUANTITY =================

  selectSize(productId: number, size: string): void {
    const current = this.selectedSizeMap.get(productId);
    current === size
      ? this.selectedSizeMap.delete(productId)
      : this.selectedSizeMap.set(productId, size);
  }

  isSizeSelected(productId: number, size: string): boolean {
    return this.selectedSizeMap.get(productId) === size;
  }

  getQuantity(product: ProductCard): number {
    const selectedSize = this.selectedSizeMap.get(product.productId);

    if (selectedSize) {
      return product.sizes.find(s => s.size === selectedSize)?.quantity ?? 0;
    }

    return product.sizes.reduce((t, s) => t + s.quantity, 0);
  }

  isLowStock(product: ProductCard): boolean {
    return product.sizes.some(s => s.quantity < 3);
  }

  // ================= MENU & PRICE =================

  openMenu(product: ProductCard): void {
    this.activeMenu = this.activeMenu === product ? null : product;
  }

  openUpdatePrice(product: ProductCard): void {
    this.editingProduct = product;
    this.newPrice = product.price;
    this.activeMenu = null;
  }

  updatePrice(): void {
    if (!this.editingProduct || this.newPrice <= 0) return;

    this.productService
      .updateProductPrice(this.editingProduct.productId, this.newPrice)
      .subscribe({
        next: () => {
        // update UI after backend success
          this.editingProduct!.price = this.newPrice;
          this.editingProduct = null;
        },
        error: () => {
          alert('Failed to update price');
        }
      });
  }


  // ================= ADD STYLE =================

  addStyle(): void {
    if (!this.newStyle.trim()) return;
    this.productService.addStyle({
      name: this.newStyle.trim(),
      categoryId: 1 // Women
    }).subscribe({
      next: () => {
        this.newStyle = '';
        this.showAddStyle = false;
        this.loadStyles(); // refresh sidebar
     },
     error: err => {
      alert(err.error || 'Style already exists');
     }
    });
}

  // ================= UI =================

  toggleMenu(event: Event): void {
    event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
  }
}
