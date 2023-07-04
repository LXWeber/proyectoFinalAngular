import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Colectivo } from 'src/app/models/colectivo';
import { Modelo } from 'src/app/models/modelo';
import { ColectivoService, ColectivosDTO } from 'src/app/services/colectivo.service';
import { ModeloService } from 'src/app/services/modelo.service';

@Component({
  selector: 'app-colectivo-modif',
  templateUrl: './colectivo-modif.component.html',
  styleUrls: ['./colectivo-modif.component.css'],
})
export class ColectivoModifComponent implements OnInit {
  colectivoSelec: Colectivo | null = null;
  nuevo: boolean = true;

  listaModelos: Modelo[] = [];
  modeloSelec: Modelo | null = null;

  coleForm: FormGroup = this.fb.group({
    patente: ['', Validators.required],
    cantidadAsientos: [0, [Validators.required, Validators.min(1), Validators.max(70)]],
    modelo: [0, Validators.required],
  });

  constructor(
    private colectivoService: ColectivoService,
    private modeloService: ModeloService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      if (id) {
        this.encontrarColectivo(Number(id));
        this.nuevo = false;
      }
    });

    this.modeloService.findAll().subscribe(
      (res) => {
        if (res.body) {
          this.listaModelos = res.body?.map(
            (json) => new Modelo(json.id, json.marca, json.nombre)
          );
        }
      },
      (error) => {
        console.log('Ha ocurrido un error al cargar los modelos');
      }
    );
  }

  encontrarColectivo(id: number) {
    this.colectivoService.findOne(id).subscribe(
      (res) => {
        if (res.body) {
          this.colectivoSelec = new Colectivo(
            res.body.id,
            res.body.patente,
            res.body.cantidadAsientos,
            res.body.modeloId
          );
          this.coleForm.patchValue({
            patente: this.colectivoSelec.patente,
            cantidadAsientos: this.colectivoSelec.cantidadAsientos,
            modelo: this.colectivoSelec.modeloId,
          });
        }
      },
      (error) => {
        console.log(error);
        this.snackBar.open(error, 'Cerrar');
        this.router.navigate(['layout', 'colectivo', 'lista']);
      }
    );
  }

  volver() {
    this.router.navigate(['layout', 'colectivos', 'lista']);
  }

  guardarCambios() {
    const body: ColectivosDTO = {
      //@ts-ignore
      id: null,
      //@ts-ignore
      patente: this.coleForm.get('patente').value,
      //@ts-ignore
      cantidadAsientos: this.coleForm.get('cantidadAsientos').value,
      //@ts-ignore
      modeloId: this.coleForm.get('modelo').value,
    };

    if (!this.nuevo) {//@ts-ignore
      body.id = this.colectivoSelec.id;

      this.colectivoService.modifColectivo(body).subscribe(
        (res) => {
          this.snackBar.open('Cambios guardados!', 'Cerrar', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 2500,
          });
          this.router.navigate(['layout', 'colectivos', 'lista']);
        },
        (error) => {
          console.log(error);
          this.snackBar.open(error, 'Cerrar');
        }
      );
    } else {
      this.colectivoService.crearColectivo(body).subscribe(
        (res) => {
          this.snackBar.open('Colectivo creado exitosamente!', 'Cerrar', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 2500,
          });
          this.router.navigate(['layout', 'colectivos', 'lista']);
        },
        (error) => {
          console.log(error);
          this.snackBar.open(error, 'Cerrar');
        }
      );
    }
  }
}
