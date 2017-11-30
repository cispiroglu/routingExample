import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { slideInOutAnimation } from '../_animations/index';
import { ProductService, PubSubService } from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'product-add-edit.component.html',
    animations: [slideInOutAnimation],
    host: { '[@slideInOutAnimation]': '' }
})

export class ProductAddEditComponent implements OnInit {
    title = "Ürün Ekranı";
    product: any = {};

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private productService: ProductService,
        private pubSubService: PubSubService) { }

    ngOnInit() {
        let productId = Number(this.route.snapshot.params['id']);
        if (productId) {
            this.title = 'Edit Product';
            this.product = this.productService.getById(productId);
        }
    }

    saveProduct() {
        this.productService.save(this.product);
        this.router.navigate(['products']);
        this.pubSubService.publish('products-updated');
    }
}