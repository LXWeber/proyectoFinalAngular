import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColectivoListComponent } from './colectivo-list/colectivo-list.component';
import { ColectivoModifComponent } from './colectivo-modif/colectivo-modif.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColectivoAdminRoutingModule } from './colectivo-admin-routing.module';



@NgModule({
  declarations: [
    ColectivoListComponent,
    ColectivoModifComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ColectivoAdminRoutingModule
  ],
  exports: [
    ColectivoListComponent,
    ColectivoModifComponent,
  ]
})
export class ColectivoAdminModule { }
