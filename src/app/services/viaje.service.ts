import { Injectable } from '@angular/core';
import { Viaje } from '../models/viaje';
import { catchError, first, map, mergeMap, Observable, of, throwError } from "rxjs";
import { environment } from 'src/environments/environments';
import { HttpClient, HttpResponse } from '@angular/common/http';

export interface ViajeDTO{
  id?: number,
  lugarSalida: string,
  lugarDestino: string,
  fechaLlegada: Date,
  fechaSalida: Date,
  personaId: number[],
  idColectivo: number
}

@Injectable({
  providedIn: 'root'
})
export class ViajeService {

  resourceUrl = environment.backendUrl + "viajes"

  constructor(private http: HttpClient) { }

  findAll(): Observable<HttpResponse<any[]>> {
    return this.http.get<any[]>(this.resourceUrl,{observe: "response"}).pipe(
      catchError(err => {
        console.log("Ocurrió un error:");
        console.log(err);
        return throwError(() => "Paso algo");
      })
    );
  }

  findOne(id: number): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.resourceUrl+'/'+id,{observe: "response"}).pipe(
      catchError(err => {
        console.log("Ocurrió un error:");
        console.log(err);
        return throwError(() => "No existe viaje con ese ID");
      })
    );
  }

  modifViaje(viaje: ViajeDTO): Observable<any>{
    return this.http.put<any>(this.resourceUrl + '/' + viaje.id, viaje).pipe(
      catchError(err => {
        console.log("Ocurrió un error:");
        console.log(err);
        return throwError(() => "No se pudo modificar viaje");
      })
    )
  }

  crearViaje(viaje: ViajeDTO): Observable<any> {
    return this.http.post<any>(this.resourceUrl, viaje).pipe(
      catchError(err => {
        console.log("Ocurrio un error: ");
        console.log(err);
        return throwError(() => "No se pudo crear viaje");
      }),
    );
  }

  borrar(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>( this.resourceUrl + '/' + id, {observe: "response"}).pipe(
      catchError(err => {
        console.log("Ocurrio un error: ");
        console.log(err);
        return throwError(() => "No existe ese viaje");
      }),
    );
  }
}
