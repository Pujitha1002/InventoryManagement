import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.services';
import { Router } from '@angular/router';

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

    /* ===== SIDEBAR (UNCHANGED) ===== */
    userName = 'Guest';
    isMenuOpen = false;
    showCartPanel = false;
    showLowStockPanel = false;

    constructor(public cartService: CartService, private router: Router) { }

    ngOnInit() {
        const storedUser = localStorage.getItem('username');
        if (storedUser) this.userName = storedUser;
    }

    toggleMenu(event: Event) {
        event.stopPropagation();
        this.isMenuOpen = !this.isMenuOpen;
    }
    toggleCartPanel() {
        this.showCartPanel = !this.showCartPanel;
    }

    toggleLowStockPanel() {
        this.showLowStockPanel = !this.showLowStockPanel;
    }

    closeMenu() {
        this.isMenuOpen = false;
    }

    logout() {
        // optional: clear storage later if you want
        // localStorage.clear();
        // sessionStorage.clear();

        localStorage.clear();   // optional but recommended
        this.router.navigate(['/signin']); // or '/signin'
    }


    @HostListener('document:click')
    clickOutside() {
        this.isMenuOpen = false;
    }

    /* ===== DATA (SAME SOURCE AS CATEGORY PAGE) ===== */

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
        },
        {
            name: 'Running Shoes',
            category: 'Shoes',
            price: 2499,
            image: 'assets/shoes.png',
            quantityPerSize: { '6': 0, '7': 0, '8': 0, '9': 0, '10': 0 }
        }
    ];

    selectedCategory: string | null = null;
    selectedStyle: string | null = null;

    productMode: 'existing' | 'new' = 'existing';

    selectedProduct: StoreProduct | null = null;

    /* ===== NEW PRODUCT INPUTS ===== */
    newProductName = '';
    newProductPrice = 0;
    newProductSizes: Record<string, number> = {};

    /* ===== DROPDOWNS ===== */

    get filteredProducts() {
        return this.selectedCategory
            ? this.products.filter(p => p.category === this.selectedCategory)
            : [];
    }

    get filteredStyles(): string[] {
        return [...new Set(this.filteredProducts.map(p => p.name))];
    }

    get activeSizes(): string[] {
        if (this.productMode === 'new') {
            if (this.selectedCategory === 'Shoes') return this.shoeSizes;
            if (this.selectedCategory === 'Accessories') return [];
            return this.clothingSizes;
        }

        if (!this.selectedProduct?.quantityPerSize) return [];
        if (this.selectedProduct.category === 'Shoes') return this.shoeSizes;
        if (this.selectedProduct.category === 'Accessories') return [];
        return this.clothingSizes;
    }

    /* ===== QUANTITY ===== */

    increase(size: string) {
        if (this.productMode === 'existing' && this.selectedProduct?.quantityPerSize) {
            this.selectedProduct.quantityPerSize[size]++;
        }

        if (this.productMode === 'new') {
            this.newProductSizes[size] = (this.newProductSizes[size] || 0) + 1;
        }
    }

    decrease(size: string) {
        if (
            this.productMode === 'existing' &&
            this.selectedProduct?.quantityPerSize &&
            this.selectedProduct.quantityPerSize[size] > 0
        ) {
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

    get cartItems() {
        return this.cartService.getCart();
    }

    get lowStockProducts(): StoreProduct[] {
        return this.products.filter(p =>
            p.quantityPerSize &&
            Object.values(p.quantityPerSize).some(q => q < 3)
        );
    }

    get totalPrice(): number {
        if (this.productMode === 'existing' && this.selectedProduct) {
            return this.totalQuantity * this.selectedProduct.price;
        }
        return 0; // ❌ New product does not calculate selling price
    }

    /* ===== ACTIONS ===== */

    addExistingToCart() {
        if (!this.selectedProduct) return;

        // ❗ NEW VALIDATION (ADDED)
        if (this.totalQuantity === 0 || this.totalPrice === 0) {
            alert('Quantity must be greater than 0 to add to cart');
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

    addNewProduct() {
        if (!this.selectedCategory || !this.newProductName || !this.newProductPrice) {
            alert('Enter product name and price');
            return;
        }




        const newProduct: StoreProduct = {
            name: this.newProductName,
            category: this.selectedCategory,
            price: this.newProductPrice,
            image: 'assets/default-product.png',
            quantityPerSize:
                this.selectedCategory === 'Accessories'
                    ? undefined
                    : this.selectedCategory === 'Shoes'
                        ? { '6': 0, '7': 0, '8': 0, '9': 0, '10': 0 }
                        : { XS: 0, S: 0, M: 0, L: 0, XL: 0 }
        };

        this.products.push(newProduct);

        alert('New product added to inventory');

        // reset
        this.productMode = 'existing';
        this.newProductName = '';
        this.newProductPrice = 0;
        this.newProductSizes = {};
    }
}
