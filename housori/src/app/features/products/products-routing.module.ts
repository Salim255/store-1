import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import { ProductsComponent } from "./products.component";

const routes: Routes =[
  {
    path: '',
    component: ProductsComponent // Assuming ProductsComponent is defined elsewhere
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ProductsRoutingModule {}
