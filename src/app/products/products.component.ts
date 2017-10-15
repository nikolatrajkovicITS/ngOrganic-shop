import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../shared/services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../shared/models/product';
import 'rxjs/add/operator/switchMap';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';
import { ShoppingCart } from '../shared/models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart$: Observable<ShoppingCart>;

   constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCardService: ShoppingCartService
  ) {
    
    
   }

   async ngOnInit() {
    this.cart$ = await this.shoppingCardService.getCart();
    this.populateProducts();
   }

   private populateProducts() {
      this.productService                        // We going to product service
      .getAll()                                  // Get all the products 
      .switchMap(products => {                
        this.products = products;                // store them here
        return this.route.queryParamMap;         // we got route parammaters 
      })
      .subscribe(params => {                 
        this.category = params.get('category');  // get the category
        this.applyFilter();                      // apply the filter
       });
   }

   private applyFilter() {
    this.filteredProducts = (this.category) ?                    // we got filterProducts and category 
    this.products.filter(p => p.category === this.category) :    // we got products
    this.products;
   }
  
}
