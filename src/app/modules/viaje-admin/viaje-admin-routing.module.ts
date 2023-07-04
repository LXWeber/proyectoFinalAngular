import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViajeListComponent } from './viaje-list/viaje-list.component';
import { ViajeModifComponent } from './viaje-modif/viaje-modif.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'lista', component: ViajeListComponent},
  {path: 'modif/:id', component: ViajeModifComponent},
  {path: 'crear', component: ViajeModifComponent},
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
export class ViajeAdminRoutingModule { }
