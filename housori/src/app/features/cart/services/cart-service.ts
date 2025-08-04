import { Injectable } from "@angular/core";
import { Product } from "../../products/model/product.model";
import { BehaviorSubject } from "rxjs";
interface CartDetails {
  numItemInCart: number;
  cartItems: Product [];
  cartTotal: number;
  shipping: number;
  tax: number;
  orderTotal: number
}
@Injectable({providedIn: 'root'})
export class CartService {
  cartStateSubject = new BehaviorSubject<CartDetails>({
  numItemInCart: 0,
  cartItems: [],
  cartTotal: 0,
  shipping: 0,
  tax: 0,
  orderTotal: 0
});

 updateCart(cart: CartDetails){
  this.cartStateSubject.next(cart)
 }
  //cartStat: CartDetails
  addItemToCart(product: Product){
    const cart = this.cartStateSubject.value;
    cart.cartItems.push(product);
    cart.cartTotal =+ product.price;
    cart.numItemInCart++;
    cart.shipping =+ product.shipping ? 0: 10;
    cart.tax =+ 10;
    cart.orderTotal =+ cart.cartTotal+ cart.tax;
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  removeItemFromCart(product: Product){
    const cart = this.cartStateSubject.value;
    cart.cartItems = cart.cartItems.filter(item => item._id  !== product._id );
    cart.cartTotal =- product.price;
    cart.numItemInCart--;
    cart.shipping =- product.shipping ? 0: 10;
    cart.tax =+ 10;
    cart.orderTotal =- cart.cartTotal+ cart.tax;
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}
