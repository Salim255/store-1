import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { finalize, Observable } from "rxjs";
import { SpinnerService } from "src/app/shared/services/spinner.service";

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  private spinnerEndpoints: string[] = [
    'api/v1/payments',
    'api/v1/users/auth/status',
    'api/v1/users/sign-in'
  ];
  constructor(private spinnerService: SpinnerService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Check if request URL starts with any of the specified endpoints
    const showSpinner = this.spinnerEndpoints.some(endpoint => req.url.includes(endpoint));

    if (showSpinner) {
      this.spinnerService.showSpinner();
    }

    return next.handle(req).pipe(
      finalize(() => {
        if (showSpinner) this.spinnerService.hideSpinner();
      })
    )
  }
}
