import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

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
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true
    },
  ]
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule ){
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it only on AppModule')
    }
  }
}
