import { Component, OnDestroy, OnInit, signal } from "@angular/core";
import { CartDetails, CartService } from "../features/cart/services/cart-service";
import { Subscription } from "rxjs";
import { AuthType } from "../features/auth/services/auth.service";
import { AuthService } from "../features/auth/services/auth.service";
import {CoreService} from "../core/services/core.service";
import { NavbarService } from "./services/navbar.service";
import { ToastService } from "../shared/services/toast.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
  standalone: false
})

export class NavbarComponent implements OnInit, OnDestroy {
  cartState = signal< CartDetails | null>(null);
  authType = signal<AuthType | null>(null);
  openMenu = signal<boolean>(false);
  cartStateSubscription!: Subscription;
  authTypeSubscription!: Subscription;
  authSubscription!: Subscription;
  sidBarStatusSubscription!: Subscription;
  userIsAuthenticated: boolean = false;

  constructor(
    private toastService: ToastService,
    private navbarService: NavbarService,
    private coreService: CoreService,
    private authService: AuthService,
    private cartService: CartService,
  ){}

  ngOnInit(): void {
    this.subscribeToCartState();
    this.subscribeToAuthType();
    this.subscribeToUserAuthenticated();
    this.subscribeToSideBarStatus();
  }

  subscribeToSideBarStatus(): void{
    this.sidBarStatusSubscription = this.navbarService.getSidebarStatus.subscribe(status => {
        this.openMenu.set(false);
    })
  }
  subscribeToUserAuthenticated():void{
    this.authSubscription = this.authService.userIsAuthenticated.subscribe(auth => {
      if ((!auth && this.userIsAuthenticated) !== auth) {
        this.userIsAuthenticated = auth;
        this.authType.set(AuthType.LOGIN);
        this.disableScroll();
      }
    })
  }

  subscribeToAuthType(){
    this.authTypeSubscription = this.authService.getAuthType.subscribe(type => {
      this.authType.set(type);
      this.disableScroll();
    })
  }

  subscribeToCartState(){
    this.cartStateSubscription = this.cartService.getCartState.subscribe(cartState => {
      console.log('Hello from cleared list')
      this.cartState.set(cartState);
    })
  }

  get numItemInCart(): number{
    const numItem = this.cartState()?.numItemInCart;
    return numItem ?? 0;
  }

  disableScroll():void{
    this.coreService.setDisableScroll(
      this.authType() === AuthType.GUEST || this.userIsAuthenticated
    );
  }
  onSignUp(): void{
    this.authService.setAuthType(AuthType.LOGIN);
  }
  onRegister(): void{
    this.authService.setAuthType(AuthType.SIGNUP);
  }

  get showAuthBar(): boolean {
    return (this.authType() === AuthType.GUEST) && (!this.userIsAuthenticated);
  }

  get showAuthModal(): boolean {
    return (this.authType() !== AuthType.GUEST) && (!this.userIsAuthenticated);
  }

  onMenu(): void{
    this.openMenu.set(true);
  };

  ngOnDestroy(): void {
    this.sidBarStatusSubscription?.unsubscribe();
    this.cartStateSubscription?.unsubscribe();
    this.authSubscription?.unsubscribe();
  }
}
