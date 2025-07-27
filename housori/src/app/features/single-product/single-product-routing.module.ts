import { RouterModule, Routes } from "@angular/router";
import { SingleProductComponent } from "./single-product.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: '',
    component: SingleProductComponent
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SingleProductRoutingModule{}
