import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Viaje } from 'src/app/models/viaje';
import { ViajeService } from 'src/app/services/viaje.service';
import { Colectivo } from 'src/app/models/colectivo';
import { ColectivoService } from 'src/app/services/colectivo.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersonaService } from 'src/app/services/persona.service';
import { Persona } from 'src/app/models/persona';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-viaje-list',
  templateUrl: './viaje-list.component.html',
  styleUrls: ['./viaje-list.component.css'],
})
export class ViajeListComponent implements OnInit {
  displayedColumns = [
    'id',
    'origen',
    'destino',
    'fechaLlegada',
    'fechaSalida',
    'colectivo',
    'pasajeros',
    'acciones',
  ];
  dataSource = [];

  constructor(
    private router: Router,
    private viajeService: ViajeService,
    private colectivoService: ColectivoService,
    private personaService: PersonaService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.viajeService.findAll().subscribe((res) => {
      //@ts-ignore
      this.dataSource = res.body?.map((res) => {
        const v = new Viaje(
          res.id,
          res.lugarSalida,
          res.lugarDestino,
          res.fechaSalida,
          res.fechaLlegada,
          res.idColectivo
        );
        v.pasajeros = res.personaId;
        /* this.obtenerPersonas(v.pasajeros); */
        console.log(v.pasajeros);
        this.findColectivo(v);
        return v;
      });
    });
  }

  /* obtenerPersonas(ids: number[]) {
    const observables = ids.map((id) => this.personaService.findOne(id));

    forkJoin(observables).subscribe((responses) => {
      const lista: Persona[] = responses.map((res) => {
        return new Persona(
          res.body.id,
          res.body.edad,
          res.body.name,
          res.body.lastName
        );
      });
      return item.patente + " - "+ item.cantidadAsientos+" - "+ item.modelo?.marca;
    });
  } */

  /* obtenerPersonas(ids: number[]) {
    const observables = [];

    for (var item of ids) {
      observables.push(this.personaService.findOne(item));
    }

    forkJoin(observables).subscribe((responses) => {
      for (var res of responses) {
        const p = new Persona(
          res.body.id,
          res.body.edad,
          res.body.name,
          res.body.lastName
        );
        console.log(p);
      }
    });
  } */

  /* funcion(value:number[]){
    for (var item of value) {
      this.personaService.findOne(item).subscribe( res => {
        const p = new Persona(
          res.body.id,
          res.body.edad,
          res.body.name,
          res.body.lastName,
        )
        console.log(p)
      })}
       */
  /* this.personaService.findOne(value).subscribe( res => {
      const p = new Persona(
        res.body.id,
        res.body.edad,
        res.body.nombre,
        res.body.apellido,
      )
      console.log(p.nombre);
    }) */
  /* } */
  getPasajeros(pasajeros: number[]) {
    //@ts-ignore
    /* pasajeros.forEach(item => {
      this.personaService.findOne(item).subscribe( res => {
        console.log(res.nombre);
      })
    }); */
  }

  /*   const recorreArray = arr => arr.forEach(item => {
    console.log(item);
  }); */

  findColectivo(v: Viaje) {
    this.colectivoService.findOne(v.idCole).subscribe((res) => {
      v.colectivo = res.body;
    });
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
    dialogRef.afterClosed().subscribe((result) => {
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
    private snackBar: MatSnackBar
  ) {}

  eliminarViaje(Viaje: Viaje) {
    this.viajeService.borrar(Viaje.id).subscribe(
      (res) => {
        this.snackBar.open('Viaje eliminado', 'Cerrar', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 2500,
        });
      },
      (error) => {
        console.log(error);
        this.snackBar.open(error, 'Cerrar');
      }
    );
  }
}
