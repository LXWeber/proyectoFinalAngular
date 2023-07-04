import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout.component';
import { AdminTopbarComponent } from './components/admin-topbar/admin-topbar.component';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/modules/material/material.module';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminTopbarComponent,
    AdminSidebarComponent
  ],
  imports: [
    CommonModule,
    NgIf,
    MaterialModule,
    RouterModule,
  ],
  exports:[
    AdminLayoutComponent
  ]
})
export class AdminLayoutModule { }
