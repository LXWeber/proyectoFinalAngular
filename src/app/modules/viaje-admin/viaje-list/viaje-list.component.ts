import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Viaje } from 'src/app/models/viaje';
import { ViajeService } from 'src/app/services/viaje.service';
import { Colectivo } from 'src/app/models/colectivo';
import { ColectivoService } from 'src/app/services/colectivo.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-viaje-list',
  templateUrl: './viaje-list.component.html',
  styleUrls: ['./viaje-list.component.css']
})
export class ViajeListComponent implements OnInit {

  displayedColumns = ['id', 'origen', 'destino', 'fechaLlegada', 'fechaSalida', 'colectivo', 'acciones'];
  dataSource = [];

  constructor(
    private router: Router,
    private viajeService: ViajeService,
    private colectivoService: ColectivoService,
    public dialog: MatDialog
    ){}

  ngOnInit() {
    this.cargar();
  }

  cargar(){
    this.viajeService.findAll().subscribe( res =>{
      //@ts-ignore
      this.dataSource = res.body?.map( res => {
        const v = new Viaje(
          res.id,
          res.lugarSalida,
          res.lugarDestino,
          res.fechaSalida,
          res.fechaLlegada,
          res.idColectivo,
        )
        this.findColectivo(v);
        return v;
      });
    });
  }

  findColectivo(v: Viaje){
    this.colectivoService.findOne(v.idCole).subscribe( res => {
      v.colectivo = res.body;
    })
  }

  crear() {
    this.router.navigate(['layout', 'viajes', 'crear']);
  }

  modificar(v: Viaje) {
    this.router.navigate(['layout', 'viajes', 'modif', v.id]);
  }

  dialogoEliminar(v: Viaje) {
    const dialogRef = this.dialog.open(DialogoEliminar, {
      data: {
        id: v.id,
        lugarDestino: v.lugarDestino,
        lugarSalida: v.lugarSalida,
        fechaLlegada: v.fechaLlegada,
        fechaSalida: v.fechaSalida,
        colectivo: v.colectivo.patente,
      },
      exitAnimationDuration: '1000ms',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.cargar();
    });
  }

}

@Component({
  selector: 'dialogo-eliminar',
  templateUrl: './dialogo-eliminar.html',
  styleUrls: ['./viaje-list.component.css'],
  standalone: true,
  imports: [FormsModule, MaterialModule],
})

export class DialogoEliminar {
  constructor(
    public dialogRef: MatDialogRef<DialogoEliminar>,
    @Inject(MAT_DIALOG_DATA)
    public data: Viaje,
    public viajeService: ViajeService,
    private snackBar: MatSnackBar,) {}

    eliminarViaje(Viaje: Viaje) {
      this.viajeService.borrar(Viaje.id).subscribe(
        (res) => {
          this.snackBar.open(
            'Viaje eliminado',
            'Cerrar', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 2500,
            }
          );
        },
        (error) => {
          console.log(error);
          this.snackBar.open(error, 'Cerrar');
        }
      );;
    }
}

