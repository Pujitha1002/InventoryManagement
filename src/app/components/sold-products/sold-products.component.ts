import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SalesService, SoldProduct } from '../../services/sales.service';

@Component({
    selector: 'app-sold-products',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './sold-products.component.html',
    styleUrls: ['./sold-products.component.css']
})
export class SoldProductsComponent implements OnInit {

    soldProducts: SoldProduct[] = [];
    products = ['Crop Top', 'Floral Dress', 'Running Shoes'];

    constructor(
        private salesService: SalesService,
        private router: Router
    ) { }

    ngOnInit() {
        this.soldProducts = this.salesService.getAll();
    }

    goBack() {
        this.router.navigate(['/sale']);
    }
}
