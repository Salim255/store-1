import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { HomeRoutingModule } from "./home-routing.module";
import { FeaturedComponent } from "./components/featured/featured.component";

@NgModule({
  declarations: [HomeComponent, FeaturedComponent],
  imports: [HomeRoutingModule],
})

export class HomeModule { }
