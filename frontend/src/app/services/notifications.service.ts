import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private toastr: ToastrService) { }

  showSuccess(msg: string) {
    this.toastr.clear();
    this.toastr.success(msg, 'SUCCESS')
  }

  showError(msg: string) {
    this.toastr.clear();
    this.toastr.error(msg, 'ERROR')
  }
}
