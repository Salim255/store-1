import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    ToastrModule.forRoot({  // ToastrModule configuration
      timeOut: 3000,
      positionClass: 'toast-top-center', // default position
      preventDuplicates: true,
      newestOnTop: true,
      // This ensures the toast container is global
      //toastComponent: undefined,
    }),
  ]
})

export class CoreModule {}
