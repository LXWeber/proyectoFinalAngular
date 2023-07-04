import { Colectivo } from "./colectivo";

export class Viaje {
  id: number;
  lugarSalida: string;
  lugarDestino: string;
  fechaLlegada: Date;
  fechaSalida: Date;
  //@ts-ignore
  pasajeros: number[];
  idCole: number;
  //@ts-ignore
  colectivo: Colectivo;

  constructor(
    id: number,
    lugarSalida: string,
    lugarDestino: string,
    fechaLlegada: string,
    fechaSalida: string,
    idCole: number
  ) {
    this.id = id;
    this.lugarSalida = lugarSalida;
    this.lugarDestino = lugarDestino;
    this.fechaLlegada = new Date(fechaLlegada);
    this.fechaSalida = new Date(fechaSalida);
    this.idCole = idCole;
  }
}
