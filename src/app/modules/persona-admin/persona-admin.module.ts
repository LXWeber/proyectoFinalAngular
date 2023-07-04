import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { PersonaAdminRoutingModule } from './persona-admin-routing.module';
import { PersonaListComponent } from './persona-list/persona-list.component';
import { PersonaModifComponent } from './persona-modif/persona-modif.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PersonaListComponent,
    PersonaModifComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PersonaAdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    PersonaListComponent,
    PersonaModifComponent,
  ]
})
export class PersonaAdminModule { }
