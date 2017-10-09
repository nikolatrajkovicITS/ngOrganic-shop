import { ShoppingCartService } from '../shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../models/product';
import 'rxjs/add/operator/switchMap';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart: any;
  subscription: Subscription;

   constructor(
    route: ActivatedRoute,
    productService: ProductService,
    private shoppingCardService: ShoppingCartService
  ) {
    
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

   async ngOnInit() {
    this.subscription = (await this.shoppingCardService.getCart())
      .subscribe(cart => this.cart = cart);
   }

   ngOnDestroy() {
     this.subscription.unsubscribe();
   }
  
}
