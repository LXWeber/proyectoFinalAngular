import { Injectable } from '@angular/core';
import { Colectivo } from '../models/colectivo';
import { catchError, first, map, mergeMap, Observable, of, throwError } from "rxjs";
import { environment } from 'src/environments/environments';
import { HttpClient, HttpResponse } from '@angular/common/http';

export interface ColectivosDTO{
  id: number,
  patente: string,
  cantidadAsientos: number,
  modeloId: number,
}

@Injectable({
  providedIn: 'root'
})
export class ColectivoService {

  resourceUrl = environment.backendUrl + "colectivos"

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
        return throwError(() => "No existe colectivo con ese ID");
      })
    );
  }

  modifColectivo(colectivo: ColectivosDTO): Observable<any>{
    return this.http.put<any>(this.resourceUrl + '/' + colectivo.id, colectivo).pipe(
      catchError(err => {
        console.log("Ocurrió un error:");
        console.log(err);
        return throwError(() => "Paso algo intentando modificar el colectivo");
      })
    )
  }

  crearColectivo(colectivo: ColectivosDTO): Observable<any> {
    return this.http.post<any>(this.resourceUrl, colectivo).pipe(
      catchError(err => {
        console.log("Ocurrio un error: ");
        console.log(err);
        return throwError(() => "No se pudo crear colectivo");
      }),
    );
  }

  borrar(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>( this.resourceUrl + '/' + id, {observe: "response"}).pipe(
      catchError(err => {
        console.log("Ocurrio un error: ");
        console.log(err);
        return throwError(() => "No existe colectivo con ese ID");
      }),
    );
  }

}
