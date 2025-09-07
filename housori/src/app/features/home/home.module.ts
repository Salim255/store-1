import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { HomeRoutingModule } from "./home-routing.module";
import { FeaturedComponent } from "./components/featured/featured.component";
import { CommonModule } from "@angular/common";
import { FeaturedItemComponent } from "./components/featured-item/featured-item.component";
import { IntroComponent } from "./components/intro/intro.component";

@NgModule({
  declarations: [
    IntroComponent,
    FeaturedItemComponent,
    HomeComponent,
    FeaturedComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule],
})

export class HomeModule { }
