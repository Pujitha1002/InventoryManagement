import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-update-price',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './update-price.component.html',
    styleUrls: ['./update-price.component.css']
})
export class UpdatePriceComponent {
    product: any;
    newPrice = 0;

    constructor(private router: Router) {
        const nav = this.router.getCurrentNavigation();
        this.product = nav?.extras?.state?.['product'];

        if (!this.product) {
            this.router.navigate(['/dashboard']);
        }

        this.newPrice = this.product.price;
    }

    updatePrice() {
        this.product.price = this.newPrice;
        this.router.navigate(['/dashboard']);
    }
}
