import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'jv-loader',
  template: `
    <!--   <div class="spinner">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
    </div> -->
    <ngx-spinner
      bdColor="rgba(0, 0, 0, 0.8)"
      size="large"
      color="#fff"
      type="pacman"
      [fullScreen]="true"
    >
      <h2 style="font-size: 1.6rem;">Carregando...</h2>
    </ngx-spinner>
  `,
})
export class LoaderComponent implements OnInit {
  constructor(private spinner: NgxSpinnerService) {}
  ngOnInit(): void {
    this.spinner.show();
  }
}
