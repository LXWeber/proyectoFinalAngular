import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent {


  estaExpandido = false;
  hasBackdrop = !this.estaExpandido;
  
  presionado(expandio: boolean) {
    this.estaExpandido = expandio;
  }

}
