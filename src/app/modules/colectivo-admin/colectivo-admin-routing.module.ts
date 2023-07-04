import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ColectivoListComponent } from './colectivo-list/colectivo-list.component';
import { ColectivoModifComponent } from './colectivo-modif/colectivo-modif.component';

const routes: Routes = [
  {path: 'lista', component: ColectivoListComponent},
  {path: 'modif/:id', component: ColectivoModifComponent},
  {path: 'crear', component: ColectivoModifComponent},
  {path: '', redirectTo: 'lista', pathMatch: 'full'},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ColectivoAdminRoutingModule { }
