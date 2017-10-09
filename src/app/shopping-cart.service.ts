import { ShoppingCart } from './models/shopping-cart';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Product } from './models/product';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
    .map(x => new ShoppingCart());
  }

  private getItem(cartId: string, productId: string) {
    this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');      // going to the localStorage to found the CartId
    if (cartId) return cartId;   
    
    let result = await this.create();
    localStorage.setItem('cartId', result.key);   // store the cart id in the localStorage                                                       
    return result.key;
  }

  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.$key);
    item$.take(1).subscribe(item => {
      item$.update({ product: product, quantity: (item.quantity || 0) + 1 });
    });
  }

}
