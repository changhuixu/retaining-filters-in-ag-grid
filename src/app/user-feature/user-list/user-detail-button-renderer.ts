import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  imports: [RouterLink],
  template: ` <a [routerLink]="uuid" title="view details"> Details </a> `,
  styles: ``,
})
export class UserDetailButtonRenderer implements ICellRendererAngularComp {
  uuid = '';
  constructor() {}

  agInit(params: any): void {
    this.uuid = params.value;
  }

  refresh(): boolean {
    return false;
  }
}
