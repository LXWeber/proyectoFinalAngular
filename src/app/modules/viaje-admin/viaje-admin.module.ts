import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViajeListComponent } from './viaje-list/viaje-list.component';
import { ViajeModifComponent } from './viaje-modif/viaje-modif.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViajeAdminRoutingModule } from './viaje-admin-routing.module';



@NgModule({
  declarations: [
    ViajeListComponent,
    ViajeModifComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ViajeAdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ViajeListComponent,
    ViajeModifComponent
  ]
})
export class ViajeAdminModule { }
