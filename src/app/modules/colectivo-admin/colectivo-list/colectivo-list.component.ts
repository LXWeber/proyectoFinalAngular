import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Colectivo } from 'src/app/models/colectivo';
import { Modelo } from 'src/app/models/modelo';
import { ColectivoService } from 'src/app/services/colectivo.service';
import { ModeloService } from 'src/app/services/modelo.service';
import { MaterialModule } from '../../material/material.module';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-colectivo-list',
  templateUrl: './colectivo-list.component.html',
  styleUrls: ['./colectivo-list.component.css']
})

export class ColectivoListComponent implements OnInit{

  displayedColumns = ['id', 'patente', 'cantidadAsientos', 'modelo','acciones'];
  dataSource = [];

  listaColectivos: Colectivo[] = [];
  //@ts-ignore
  modeloSeleccionado: Modelo = null;


  constructor(
    private colectivoService: ColectivoService,
    private modeloService: ModeloService,
    private router : Router,
    public dialog: MatDialog
  ) {  }

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.colectivoService.findAll().subscribe(
      res => {//@ts-ignore
        this.dataSource = res.body?.map( res => {
          const c = new Colectivo(
            res.id,
            res.patente,
            res.cantidadAsientos,
            res.modeloId,
          )
          this.findModelo(c);
          return c;
        });
      },
      (error) => {
        console.log('Ha ocurrido un error al cargar');
      }
    );
  }

  findModelo(c: Colectivo){
    this.modeloService.findOne(c.modeloId).subscribe( res => {
      if(res.body){
        c.modelo = new Modelo(res.body.id,res.body.nombre,res.body.marca);
      }
    })
  }

  modificar(c:Colectivo) {
    this.router.navigate(['layout','colectivos','modif', c.id])
  }

  crear(){
    this.router.navigate(['layout','colectivos','crear'])
  }

  dialogoEliminar(c: Colectivo) {
    const dialogRef = this.dialog.open(DialogoEliminar, {
      data: {
        id: c.id,
        patente: c.patente,
        cantidadAsientos: c.cantidadAsientos,
        modeloId: c.modeloId,
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
  styleUrls: ['./colectivo-list.component.css'],
  standalone: true,
  imports: [FormsModule, MaterialModule],
})

export class DialogoEliminar {
  constructor(
    public dialogRef: MatDialogRef<DialogoEliminar>,
    @Inject(MAT_DIALOG_DATA)
    public data: Colectivo,
    public cs: ColectivoService,
    private snackBar: MatSnackBar,) {}

    eliminarColectivo(c : Colectivo) {
      this.cs.borrar(c.id).subscribe(
        (res) => {
          this.snackBar.open(
            'Colectivo eliminado',
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

