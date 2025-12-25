import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { ProductCard } from '../../../models/product-card.model';

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

  ngOnInit(): void {
    this.loadStyles();
    this.loadAllProducts();
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
