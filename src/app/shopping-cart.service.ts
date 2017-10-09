import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getCart(cartId) {
    return this.db.object('/shopping-carts/' + cartId);
  }

  private async getOrCreateCart() {
    let cartId = localStorage.getItem('cartId');      // going to the localStorage to found the CartId
    if (!cartId) {     
      let result = await this.create();
        localStorage.setItem('cartId', result.key);   // store the cart id in the localStorage                                                       
        return this.getCart(result.key);
    }
                                     
    return this.getCart(cartId);
    
  }
}
