import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar.component';

const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: ()=> import('../features/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'about',
        loadChildren: () => import('../features/about/about.module').then(m => m.AboutModule)
      },
      {
        path: 'products',
        loadChildren: () => import('../features/products/products.module').then(m => m.ProductsModule)
      },
       {
        path: 'orders',
        loadChildren: () => import('../features/orders/orders.module').then(m => m.OrdersModule)
      },
      {
        path: 'checkout',
        loadChildren: () => import('../features/checkout/checkout.module').then(m => m.CheckoutModule)
      },
       {
        path: 'cart',
        loadChildren: () => import('../features/cart/cart.module').then(m => m.CartModule)
      },
    ]
  },
  {
    path:'**',
    loadChildren: () => import('../features/error-page/error-page.module').then(m => m.ErrorPageModule)
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class NavbarRoutingModule {}
