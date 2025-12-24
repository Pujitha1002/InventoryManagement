
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

import { HostListener } from '@angular/core';
import { StyleService } from '../../services/style.service';
import { SalesService, SoldProduct } from '../../services/sales.service';

@Component({
    selector: 'app-sold-products',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './sale.component.html',
    styleUrls: ['./sale.component.css']
})

export class SaleComponent {

    productName = '';
    category = '';
    style = '';
    size = '';
    quantity = 1;
    price = 0;
    userName = 'Guest';
    isMenuOpen = false;
    sizes = ['XS', 'S', 'M', 'L', 'XL'];
    productNames = ['Crop Top', 'Floral Dress', 'Running Shoes'];
    styles = ['Tops', 'Dresses', 'Jeans', 'Casual'];

    soldProducts: any[] = [];
    showViewProducts = false;


    constructor(private router: Router, private salesService: SalesService) {
        const storedUser = localStorage.getItem('username');
        if (storedUser) this.userName = storedUser;
    }

    get totalPrice(): number {
        return this.quantity * this.price;
    }

    buyProduct() {
        this.salesService.add({
            productName: this.productName,
            category: this.category,
            style: this.style,
            size: this.size,
            quantity: this.quantity,
            price: this.price,
            total: this.totalPrice
        });

        alert('Sale recorded successfully!');

        // reset form
        this.productName = '';
        this.category = '';
        this.style = '';
        this.size = '';
        this.quantity = 1;
        this.price = 0;
    }



    addToSoldProducts() {
        this.salesService.add({
            productName: this.productName,
            category: this.category,
            style: this.style,
            size: this.size,
            quantity: this.quantity,
            price: this.price,
            total: this.totalPrice
        });

        this.productName = '';
        this.category = '';
        this.style = '';
        this.size = '';
        this.quantity = 1;
        this.price = 0;
    }



    toggleViewProducts() {
        this.showViewProducts = !this.showViewProducts;
    }


    viewReport() {
        alert('Sales report coming soon!');
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
    ngOnInit() {
        this.soldProducts = this.salesService.getAll();
    }
    goToViewProducts() {
        this.router.navigate(['/sold-products']);
    }

}
