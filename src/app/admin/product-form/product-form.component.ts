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
  id;

  constructor(
    router: Router,
    private route: ActivatedRoute,
    categoryService: CategoryService, 
    private productService: ProductService) {
    this.categories$ = categoryService.getCategories();
 
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.productService.get(this.id).take(1).subscribe(p => this.product = p);
   }

   save(product) {
     if (this.id) this.productService.update(this.id, product);
     else this.productService.create(product);

     this.router.navigate(['/admin']);
   }

   delete() {
     if (!confirm('Are you sure you want to delete this product?')) return;  
       
       this.productService.delete(this.id);
       this.router.navigate(['/admin']);
     }
   }

  ngOnInit() {
  }

}
