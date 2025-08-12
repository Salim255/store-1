import { Injectable } from "@angular/core";
import { Product } from "../../products/model/product.model";
import { BehaviorSubject, catchError, map, Observable } from "rxjs";

export type CartItem  =  Product & {
  amount: number;
};

export interface CartDetails {
  numItemInCart: number;
  cartItems: CartItem [];
  cartTotal: number;
  shipping: number;
  tax: number;
  orderTotal: number
}
const defaultState: CartDetails =  {
    numItemInCart: 0,
    cartItems: [],
    cartTotal: 0,
    shipping: 0,
    tax: 0,
    orderTotal: 0
  };

@Injectable({providedIn: 'root'})
export class CartService {
  cartStateSubject = new BehaviorSubject<CartDetails>(defaultState);

  constructor(){
    const storedCart:string | null = localStorage.getItem('cart');
    if (storedCart){
      this.cartStateSubject.next(JSON.parse(storedCart))
    };
}
 updateCart(cart: CartDetails){
  this.cartStateSubject.next(cart)
 }
  //cartStat: CartDetails
  addItemToCart(product:  CartItem ){
    const cart: CartDetails =  this.cartStateSubject.value;
    const item = cart.cartItems.find((item) => item._id === product._id);

    if (item) item.amount += product.amount;
    else cart.cartItems.push(product);

    cart.cartTotal += (product.price * product.amount);
    cart.numItemInCart++;
    cart.shipping = (product.shipping ? 0: 10);
    cart.tax = 0.1 * cart.cartTotal;
    cart.orderTotal = cart.cartTotal + cart.tax +   cart.shipping;
    localStorage.setItem('cart', JSON.stringify(cart));
    this.updateCart(cart);
  }

  removeItemFromCart(itemId: string): void{
    const cart: CartDetails = this.cartStateSubject.value;
    const product = cart.cartItems.find((item) => item._id === itemId);
    if (!product) return;
    // 1 Remove the product form the cart
    cart.cartItems = cart.cartItems.filter(item => item._id  !== product._id);
    cart.numItemInCart--;

    // 2 Remove this product price form cart total
    cart.cartTotal -= (product.price * product.amount) ;

    // Remove shipping price form the cart shipping price
    cart.shipping -= (product.shipping ? 0: 10);

    // Calculate the tax based on the new cartTotal
    cart.tax = 0.1 * cart.cartTotal;

    // Order total:
    cart.orderTotal = cart.cartTotal + cart.tax + cart.shipping;

    // Update the stored cart
    localStorage.setItem('cart', JSON.stringify(cart));
    this.updateCart(cart);
  }

  editItemAmount(itemId: string, amount: number): void {
    const cart = this.cartStateSubject.value;
    const item = cart.cartItems.find((i) => i._id === itemId);
    if (!item) return;
    // 3 - 2 => cartState.numItemInCart + 1 or 2 - 3 => cartState.numItemInCart - 1
    cart.numItemInCart += amount - item?.amount;
    cart.cartTotal += item.price * (amount - item.amount);
    item.amount = amount;

    // Calculate orderTotal:
    cart.shipping = (item.shipping ? 0: 10);
    cart.tax = 0.1 * cart.cartTotal;
    cart.orderTotal = cart.cartTotal + cart.tax +   cart.shipping;
    localStorage.setItem('cart', JSON.stringify(cart));
    this.updateCart(cart);
  }

  clearCart(): void{
    console.log("Helloo from cleare");
    const emptyCart = JSON.parse(JSON.stringify(defaultState));
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(emptyCart));
    // Notify subscribers with a fresh object
    this.cartStateSubject.next(emptyCart);
  }

  get getCartState(): Observable<CartDetails> {
    return this.cartStateSubject.asObservable();
  }

  get getCartDetailsForCheckout(): CartDetails {
    return this.cartStateSubject.value;
  }
}
