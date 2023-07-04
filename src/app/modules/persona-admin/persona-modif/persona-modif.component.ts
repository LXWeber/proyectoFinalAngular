import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from 'src/app/models/persona';
import { PersonDTO, PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-persona-modif',
  templateUrl: './persona-modif.component.html',
  styleUrls: ['./persona-modif.component.css'],
})

export class PersonaModifComponent implements OnInit {
  personaSeleccionada: Persona | null = null;
  nuevo: boolean = true;

  personForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    edad: [0, [Validators.required, Validators.min(0), Validators.max(110)]],
  });

  constructor(
    private personaService: PersonaService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.encontrarPersona(Number(id));
        this.nuevo = false
      }
    });
  }

  encontrarPersona(id: number) {
    this.personaService.findOne(id).subscribe(
      (res) => {
        if (res.body) {
          this.personaSeleccionada = new Persona(
            res.body.id,
            res.body.age,
            res.body.name,
            res.body.lastName
          );
          this.personForm.patchValue({
            nombre: this.personaSeleccionada.nombre,
            apellido: this.personaSeleccionada.apellido,
            edad: this.personaSeleccionada.edad,
          });
        }
      },
      (error) => {
        console.log(error);
        this.snackBar.open(error, 'Cerrar');
        this.router.navigate(['layout', 'persona', 'lista']);
      }
    );
  }

  volver() {
    this.router.navigate(['layout', 'persona', 'lista']);
  }

  guardarCambios() {
    const body: PersonDTO = {
      //@ts-ignore
      id: null,
      //@ts-ignore
      age: this.personForm.get('edad').value,
      //@ts-ignore
      name: this.personForm.get('nombre').value,
      //@ts-ignore
      lastName: this.personForm.get('apellido').value,
    };

    if (!this.nuevo) {//@ts-ignore
      body.id = this.personaSeleccionada.id;

      this.personaService.modifPersona(body).subscribe(
        (res) => {
          this.snackBar.open('Cambios guardados!', 'Cerrar', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 2500,
          });
          this.router.navigate(['layout', 'persona', 'lista']);
        },
        (error) => {
          console.log(error);
          this.snackBar.open(error, 'Cerrar');
        }
      );
    } else {
      this.personaService.crearPersona(body).subscribe(
        (res) => {
          this.snackBar.open('Se creó la persona correctamente', 'Cerrar', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 2500,
          });
          this.router.navigate(['layout', 'persona', 'lista']);
        },
        (error) => {
          console.log(error);
          this.snackBar.open(error, 'Cerrar');
        }
      );
    }
  }
}
