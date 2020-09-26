import { Injectable } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(private spinner: NgxSpinnerService) { }

  show(): void  {
    this.spinner.show();
  }

  hide(): void {
    this.spinner.hide();
  }
}
