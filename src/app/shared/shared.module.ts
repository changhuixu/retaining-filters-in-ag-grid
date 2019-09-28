import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { RouterModule } from '@angular/router';

import { UserDetailButtonRendererComponent } from './components/user-detail-button-renderer/user-detail-button-renderer.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AgGridModule.withComponents([UserDetailButtonRendererComponent])
  ],
  declarations: [UserDetailButtonRendererComponent],
  entryComponents: [UserDetailButtonRendererComponent],
  exports: [CommonModule, AgGridModule, UserDetailButtonRendererComponent]
})
export class SharedModule {}
