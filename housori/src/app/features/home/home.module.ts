import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { HomeRoutingModule } from "./home-routing.module";
import { FeaturedComponent } from "./components/featured/featured.component";
import { CommonModule } from "@angular/common";
import { FeaturedItemComponent } from "./components/featured-item/featured-item.component";

@NgModule({
  declarations: [
    FeaturedItemComponent,
    HomeComponent,
    FeaturedComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule],
})

export class HomeModule { }
