import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonaListComponent } from './persona-list/persona-list.component';
import { PersonaModifComponent } from './persona-modif/persona-modif.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'lista', component: PersonaListComponent},
  {path: 'modif/:id', component: PersonaModifComponent},
  {path: 'crear', component: PersonaModifComponent},
  {path: '', redirectTo: 'lista', pathMatch: 'full'},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class PersonaAdminRoutingModule { }
