import { NgModule } from "@angular/core";
import { ErrorPageComponent } from "./error-page.component";
import { ErrorPageRoutingModule } from "./error-page-routing.module";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [ErrorPageComponent],
  imports: [
    CommonModule,
    ErrorPageRoutingModule
  ],
})

export class ErrorPageModule {}
