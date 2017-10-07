import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: {title: string}[];
  filteredProducts: any[];
  subscription: Subscription;

  constructor(private productService: ProductService) { 
    this.subscription = this.productsService.getAll().subscribe(products => this.filteredProducts = this.products = products);
  }
  
  filter(query: string) {
    this.filteredProducts = (query) ?  // if the user type someting we want to applice list of products and filter
      this.products.filter(p => p.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())) :   // filter method will iterate over this array, in each iteration we got product object
      this.products;
    }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
  }

}
