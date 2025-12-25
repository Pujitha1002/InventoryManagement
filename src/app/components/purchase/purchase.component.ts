import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CartService } from '../../services/cart.services';

interface StoreProduct {
  name: string;
  category: string;
  price: number;
  image: string;
  quantityPerSize?: Record<string, number>;
}

@Component({
  selector: 'app-purchase',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  /* ---------------- BASIC ---------------- */
  userName = 'Guest';
  isMenuOpen = false;
  showCartPanel = false;
  showLowStockPanel = false;

  constructor(public cartService: CartService, private router: Router) {}

  ngOnInit() {
    const storedUser = localStorage.getItem('username');
    if (storedUser) this.userName = storedUser;
  }

  toggleMenu(event: Event) {
    event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/signin']);
  }

  @HostListener('document:click')
  clickOutside() {
    this.isMenuOpen = false;
  }

  /* ---------------- DATA ---------------- */

  categories = ['Women', 'Men', 'Kids', 'Shoes', 'Accessories'];

  clothingSizes = ['XS', 'S', 'M', 'L', 'XL'];
  shoeSizes = ['6', '7', '8', '9', '10'];

  products: StoreProduct[] = [
    {
      name: 'Crop Top',
      category: 'Women',
      price: 499,
      image: 'assets/women.png',
      quantityPerSize: { XS: 0, S: 0, M: 0, L: 0, XL: 0 }
    }
  ];

  selectedCategory: string | null = null;
  selectedStyle: string | null = null;
  selectedProduct: StoreProduct | null = null;

  productMode: 'existing' | 'new' = 'existing';

  newProductName = '';
  newProductPrice = 0;
  newProductSizes: Record<string, number> = {};
  newProductImage: string | null = null;

  /* ---------------- FILTERS ---------------- */

  get filteredProducts() {
    return this.selectedCategory
      ? this.products.filter(p => p.category === this.selectedCategory)
      : [];
  }

  get activeSizes(): string[] {
    if (this.productMode === 'new') {
      if (this.selectedCategory === 'Shoes') return this.shoeSizes;
      if (this.selectedCategory === 'Accessories') return [];
      return this.clothingSizes;
    }

    if (!this.selectedProduct?.quantityPerSize) return [];
    return Object.keys(this.selectedProduct.quantityPerSize);
  }

  /* ---------------- QUANTITY ---------------- */

  increase(size: string) {
    if (this.productMode === 'existing' && this.selectedProduct?.quantityPerSize) {
      this.selectedProduct.quantityPerSize[size]++;
    }

    if (this.productMode === 'new') {
      this.newProductSizes[size] = (this.newProductSizes[size] || 0) + 1;
    }
  }

  decrease(size: string) {
    if (this.productMode === 'existing' && this.selectedProduct?.quantityPerSize) {
      if (this.selectedProduct.quantityPerSize[size] > 0)
        this.selectedProduct.quantityPerSize[size]--;
    }

    if (this.productMode === 'new' && this.newProductSizes[size] > 0) {
      this.newProductSizes[size]--;
    }
  }

  get totalQuantity(): number {
    if (this.productMode === 'existing' && this.selectedProduct?.quantityPerSize) {
      return Object.values(this.selectedProduct.quantityPerSize).reduce((a, b) => a + b, 0);
    }

    if (this.productMode === 'new') {
      return Object.values(this.newProductSizes).reduce((a, b) => a + b, 0);
    }

    return 0;
  }
get filteredStyles(): string[] {
  return this.selectedCategory
    ? [...new Set(
        this.products
          .filter(p => p.category === this.selectedCategory)
          .map(p => p.name)
      )]
    : [];
}
addExistingToCart() {
  if (!this.selectedProduct) return;

  if (this.totalQuantity === 0 || this.totalPrice === 0) {
    alert('Quantity must be greater than 0');
    return;
  }

  this.cartService.addToCart({
    name: this.selectedProduct.name,
    image: this.selectedProduct.image,
    totalQty: this.totalQuantity,
    totalPrice: this.totalPrice
  });

  alert('Product added to cart!');
}

  get totalPrice(): number {
    if (this.productMode === 'existing' && this.selectedProduct) {
      return this.totalQuantity * this.selectedProduct.price;
    }
    return 0;
  }

  /* ---------------- IMAGE UPLOAD ---------------- */

  onImageUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.newProductImage = reader.result as string;
    };

    reader.readAsDataURL(file);
  }
  // ---------------- LOW STOCK PANEL ----------------
toggleLowStockPanel() {
  this.showLowStockPanel = !this.showLowStockPanel;
}


  /* ---------------- ADD PRODUCT ---------------- */

addNewProduct() {
  if (!this.selectedCategory || !this.newProductName || !this.newProductPrice) {
    alert('Fill all required fields');
    return;
  }

  const newProduct: StoreProduct = {
    name: this.newProductName,
    category: this.selectedCategory!,
    price: this.newProductPrice,
    image: this.newProductImage || 'assets/default-product.png',
    quantityPerSize:
      this.selectedCategory === 'Accessories'
        ? undefined
        : this.selectedCategory === 'Shoes'
        ? { '6': 0, '7': 0, '8': 0, '9': 0, '10': 0 }
        : { XS: 0, S: 0, M: 0, L: 0, XL: 0 }
  };

  // ✅ ADD TO PRODUCT LIST
  this.products.push(newProduct);

  // ✅ ADD TO CART
  this.cartService.addToCart({
    name: newProduct.name,
    image: newProduct.image,
    totalQty: this.totalQuantity,
    totalPrice: this.newProductPrice * this.totalQuantity
  });

  // ✅ RESET FORM
  this.productMode = 'existing';
  this.newProductName = '';
  this.newProductPrice = 0;
  this.newProductSizes = {};
  this.newProductImage = null;

  alert('Product added to cart successfully!');
}
}