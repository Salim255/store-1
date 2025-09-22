import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { HomeRoutingModule } from "./home-routing.module";
import { FeaturedComponent } from "./components/featured/featured.component";
import { CommonModule } from "@angular/common";
import { IntroComponent } from "./components/intro/intro.component";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [
    IntroComponent,
    HomeComponent,
    FeaturedComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    HomeRoutingModule,
  ],
})

export class HomeModule { }
