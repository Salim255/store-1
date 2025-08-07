import { Component, OnDestroy, OnInit, signal } from "@angular/core";
import { CartDetails, CartService } from "../features/cart/services/cart-service";
import { Subscription } from "rxjs";
import { AuthType } from "../features/auth/services/auth.service";
import { AuthService } from "../features/auth/services/auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
  standalone: false
})

export class NavbarComponent implements OnInit, OnDestroy {
  cartState = signal< CartDetails | null>(null);
  authType = signal<AuthType | null>(null)
  cartStateSubscription!: Subscription;
  authTypeSubscription!: Subscription;
  constructor(
    private authService: AuthService,
    private cartService: CartService,
  ){}

  ngOnInit(): void {
    this.subscribeToCartState();
    this.subscribeToAuthType();
    if (this.authType() !== AuthType.GUEST) document.body.style.overflow = 'hidden';
  }

  subscribeToAuthType(){
    this.authTypeSubscription = this.authService.getAuthType.subscribe(type => {
      this.authType.set(type);
      this.disableScroll();
    })
  }

  subscribeToCartState(){
    this.cartStateSubscription = this.cartService.getCartState.subscribe(cartState => {
      this.cartState.set(cartState);
    })
  }

  get numItemInCart(): number{
    const numItem = this.cartState()?.numItemInCart;
    return numItem ?? 0;
  }

  disableScroll():void{
      if (this.authType() === AuthType.GUEST) {
        document.body.style.overflow = 'auto';
      } else {
        document.body.style.overflow = 'hidden';
      }
    //else document.body.style.overflow = 'none';
  }
  onSignUp(): void{
    this.authService.setAuthType(AuthType.LOGIN);
  }
  onRegister(): void{
    this.authService.setAuthType(AuthType.SIGNUP);
  }

  get getAuthType(): boolean {
    return this.authType() === AuthType.GUEST;
  }
  ngOnDestroy(): void {
    this.cartStateSubscription.unsubscribe();
  }
}
