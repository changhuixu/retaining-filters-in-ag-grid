import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
    template: `
    <a [routerLink]="uuid" title="view details">
      Details
    </a>
  `,
    standalone: false
})
export class UserDetailButtonRendererComponent
  implements ICellRendererAngularComp {
  uuid = '';
  constructor() {}

  agInit(params: any): void {
    this.uuid = params.value;
  }

  refresh(): boolean {
    return false;
  }
}
