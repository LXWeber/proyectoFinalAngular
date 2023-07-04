import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';

const routes: Routes = [
  {path: '', redirectTo: 'layout/persona', pathMatch: 'full'},
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'layout/persona',
        loadChildren: () =>
          import('./modules/persona-admin/persona-admin.module').then(mod => mod.PersonaAdminModule)
      },
      {
        path: 'layout/colectivos',
        loadChildren: () =>
          import('./modules/colectivo-admin/colectivo-admin.module').then(mod => mod.ColectivoAdminModule)
      },
      {
        path: 'layout/viajes',
        loadChildren: () =>
          import('./modules/viaje-admin/viaje-admin.module').then(mod => mod.ViajeAdminModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
