import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./navbar/navbar.module').then(m => m.NavbarModule)
  },{
    path: '**',
    loadChildren: () => import('./features/error-page/error-page.module').then(m => m.ErrorPageModule)
  }

]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
