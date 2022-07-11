import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { RouterModule } from '@angular/router';
import { SpinnerModule } from '@uiowa/spinner';

import { UserDetailButtonRendererComponent } from './components/user-detail-button-renderer/user-detail-button-renderer.component';

@NgModule({
  imports: [CommonModule, RouterModule, SpinnerModule, AgGridModule],
  declarations: [UserDetailButtonRendererComponent],
  exports: [
    CommonModule,
    SpinnerModule,
    AgGridModule,
    UserDetailButtonRendererComponent,
  ],
})
export class SharedModule {}
