import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Component } from '@angular/core';
import { Product } from '../models/product';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;

  constructor(
    route: ActivatedRoute,
    productService: ProductService) {
    
    productService
     .getAll()
     .switchMap(products => {
       this.products = products;       // Switch first observable "list product" into second observable "queryParamMap"
       return route.queryParamMap;
     })
      .subscribe(params => {
        this.category = params.get('category');
   
        this.filteredProducts = (this.categories$) ?          // seting the filtered products array
          this.products.filter(p => p.category === this.category) : 
          this.products;
    });
  
   }
  
}
