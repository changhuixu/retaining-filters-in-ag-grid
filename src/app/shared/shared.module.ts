import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { RouterModule } from '@angular/router';
import { SpinnerModule } from '@uiowa/spinner';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

import { UserDetailButtonRendererComponent } from './components';
ModuleRegistry.registerModules([AllCommunityModule]);

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
