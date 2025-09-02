import { Injectable } from "@angular/core";
import { ToastrService } from 'ngx-toastr';

@Injectable({providedIn: 'root'})
export class ToastService {
  constructor(private toastr: ToastrService) {}

  success(message: string, title?: string) {
    this.toastr.success(message, title, {
        timeOut: 3000,
        progressBar: true
    });
  }

  error(message: string, title?: string) {
    this.toastr.error(message, title, {
      timeOut: 3000,
      progressBar: true
    });
  }

  info(message: string, title?: string) {
    this.toastr.info(message, title, {
      timeOut: 3000,
      progressBar: true
    });
  }

  warning(message: string, title?: string) {
    this.toastr.warning(message, title, {
      timeOut: 3000,
      progressBar: true
    });
  }
}
