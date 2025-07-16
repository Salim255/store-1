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
        path: 'cart',
        loadChildren: () => import('../features/cart/cart.module').then(m => m.CartModule)
      },
      {
        path: 'products',
        loadChildren: () => import('../features/products/products.module').then(m => m.ProductsModule)
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class NavbarRoutingModule {}
