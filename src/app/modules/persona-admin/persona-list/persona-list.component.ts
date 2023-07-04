import { Component, HostListener, Inject, OnInit, Directive } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/services/persona.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-persona-list',
  templateUrl: './persona-list.component.html',
  styleUrls: ['./persona-list.component.css'],
})

export class PersonaListComponent implements OnInit {

  displayedColumns = ['id', 'nombre', 'apellido', 'edad','acciones'];
  dataSource = [];

  listaPersonas: Persona[] = [];

  constructor(
    private personaService: PersonaService,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog
  ) {  }

  ngOnInit() {
    this.cargar();
  }

  cargar(){
    this.personaService.findAll().subscribe( res =>{
      //@ts-ignore
      this.dataSource = res.body?.map( res => {
        const p = new Persona(res.id, res.age, res.name, res.lastName);
        return p;
      });
    });
  }

  modificar(persona: Persona) {
    this.router.navigate(['layout', 'persona', 'modif', persona.id]);
  }

  crear() {
    this.router.navigate(['layout', 'persona', 'crear']);
  }

  dialogoEliminar(persona:Persona) {
    const dialogRef = this.dialog.open(DialogoEliminar, {
      data: {
        id: persona.id,
        edad: persona.edad,
        nombre: persona.nombre,
        apellido: persona.apellido,
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
  styleUrls: ['./persona-list.component.css'],
  standalone: true,
  imports: [FormsModule, MaterialModule],
})

export class DialogoEliminar {
  constructor(
    public dialogRef: MatDialogRef<DialogoEliminar>,
    @Inject(MAT_DIALOG_DATA)
    public data: Persona,
    public personaService: PersonaService,
    private snackBar: MatSnackBar,) {}

    eliminarPersona(persona: Persona) {
      this.personaService.borrar(persona.id).subscribe(
        (res) => {
          this.snackBar.open(
            'Persona eliminada',
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
