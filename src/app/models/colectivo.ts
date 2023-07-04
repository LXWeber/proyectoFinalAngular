import { Modelo } from "./modelo";

export class Colectivo {
  id: number;
  patente: string;
  cantidadAsientos: number;
  modeloId: number;
  //@ts-ignore
  modelo: Modelo;

  constructor(id: number, patente: string, cantidadAsientos: number, modeloId: number) {
    this.id = id;
    this.patente = patente;
    this.cantidadAsientos = cantidadAsientos;
    this.modeloId = modeloId;
  }
}
