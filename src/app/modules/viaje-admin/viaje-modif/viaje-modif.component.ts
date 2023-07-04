import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Colectivo } from 'src/app/models/colectivo';
import { Modelo } from 'src/app/models/modelo';
import { Persona } from 'src/app/models/persona';
import { Viaje } from 'src/app/models/viaje';
import { ColectivoService } from 'src/app/services/colectivo.service';
import { ModeloService } from 'src/app/services/modelo.service';
import { PersonaService } from 'src/app/services/persona.service';
import { ViajeDTO, ViajeService } from 'src/app/services/viaje.service';

@Component({
  selector: 'app-viaje-modif',
  templateUrl: './viaje-modif.component.html',
  styleUrls: ['./viaje-modif.component.css']
})
export class ViajeModifComponent implements OnInit{
  nuevo: boolean = true;

  viajeForm: FormGroup = this.fb.group({
    origen: ['', Validators.required],
    destino: ['', Validators.required],
    fechaSalida: [new Date(), Validators.required],
    fechaLlegada: [new Date(), Validators.required],
    colectivo: [0, Validators.required],
    pasajeros: [[], Validators.required]
  });

  coleList: Colectivo[] = [];
  listaPersonas: Persona[] = [];
  //@ts-ignore
  viajeSeleccionado: Viaje | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private viajeService: ViajeService,
    private coleService: ColectivoService,
    private modeloService: ModeloService,
    private personService: PersonaService,
    private snackBar: MatSnackBar,
    ){}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.findViaje(Number(id));
        this.nuevo = false
      }
    });

    this.coleService.findAll().subscribe( res => {
      //@ts-ignore
      this.coleList = res.body.map(json => {
        const colectivo = new Colectivo(
          json.id,
          json.patente,
          json.cantidadAsientos,
          json.modeloId
        )
        this.findModeloColectivo(colectivo);
        return colectivo;
      });
    },error =>{
      console.log(error);
      this.snackBar.open(error, 'Cerrar',{
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    });

    this.personService.findAll().subscribe(res => {
      //@ts-ignore
      this.listaPersonas = res.body?.map(json => new Persona(json.id, json.age, json.name, json.lastName));
    })
  }

  findViaje(id: number) {
    this.viajeService.findOne(id).subscribe(
      (res) => {
        if (res.body) {
          this.viajeSeleccionado = new Viaje(
            res.body.id,
            res.body.lugarSalida,
            res.body.lugarDestino,
            res.body.fechaLlegada,
            res.body.fechaSalida,
            res.body.idColectivo,
            );
          this.viajeForm.patchValue({
            id: this.viajeSeleccionado.id,
            origen: this.viajeSeleccionado.lugarSalida,
            destino: this.viajeSeleccionado.lugarDestino,
            fechaSalida: this.viajeSeleccionado.fechaSalida,
            fechaLlegada: this.viajeSeleccionado.fechaLlegada,
            colectivo: this.viajeSeleccionado.idCole,
          });
        }
      },
      (error) => {
        console.log(error);
        this.snackBar.open(error, 'Cerrar');
        this.router.navigate(['layout', 'viajes', 'lista']);
      }
    );
  }

  findModeloColectivo(c: Colectivo){
    this.modeloService.findOne(c.modeloId).subscribe( res => {
      if(res.body){
        c.modelo = new Modelo(res.body.id,res.body.nombre,res.body.marca);
      }
    })
  }

  volver() {
    this.router.navigate(['layout', 'viajes', 'lista']);
  }

  guardarCambios() {
    const body: ViajeDTO = {
      //@ts-ignore
      id: null,
      lugarSalida: this.viajeForm.get('origen')?.value,
      lugarDestino: this.viajeForm.get('destino')?.value,
      fechaLlegada: this.viajeForm.get('fechaLlegada')?.value,
      fechaSalida: this.viajeForm.get('fechaSalida')?.value,
      idColectivo: this.viajeForm.get('colectivo')?.value,
      personaId: this.viajeForm.get('pasajeros')?.value,
    };

    if (!this.nuevo) {//@ts-ignore
      body.id = this.viajeSeleccionado.id;

      this.viajeService.modifViaje(body).subscribe(
        (res) => {
          this.snackBar.open('Cambios guardados!', 'Cerrar', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 2500,
          });
          this.router.navigate(['layout', 'viajes', 'lista']);
        },
        (error) => {
          console.log(error);
          this.snackBar.open(error, 'Cerrar');
        }
      );
    } else {
      this.viajeService.crearViaje(body).subscribe(
        (res) => {
          this.snackBar.open('Viaje creado exitosamente!', 'Cerrar', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 2500,
          });
          this.router.navigate(['layout', 'viajes', 'lista']);
        },
        (error) => {
          console.log(error);
          this.snackBar.open(error, 'Cerrar');
        }
      );
    }
  }
}
