import { ProductService } from '../../product.service';
import { CategoryService } from '../../category.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  categories$;
  product = {};

  constructor(
    router: Router,
    private route: ActivatedRoute,
    categoryService: CategoryService, 
    private productService: ProductService) {
    this.categories$ = categoryService.getCategories();
 
    let id = this.route.snapshot.paramMap.get('id');
    if (id) this.productService.get(id).take(1).subscribe(p => this.product = p);
   }

   save(product) {
     this.productService.create(product);
     this.router.navigate(['/admin']);
   }

  ngOnInit() {
  }

}
