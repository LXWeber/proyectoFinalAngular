import { Injectable } from '@angular/core';
import { Modelo } from '../models/modelo';
import { Observable, catchError, first, map, mergeMap, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { HttpClient, HttpResponse } from '@angular/common/http';

export interface ModeloDTO{
  id: number,
  nombre: string,
  marca: string
}

@Injectable({providedIn: 'root'})

export class ModeloService {

  resourceUrl = environment.backendUrl + "modelos"

  constructor(private http: HttpClient) { }

  findAll(): Observable<HttpResponse<any[]>> {
    return this.http.get<any[]>(this.resourceUrl,{observe: "response"}).pipe(
      catchError(err => {
        console.log("Ocurrió un error:");
        console.log(err);
        return throwError(() => "Paso algo al intentar encontrar todos los modelos");
      })
    );
  }

  findOne(id: number): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.resourceUrl+'/'+id,{observe: "response"}).pipe(
      catchError(err => {
        console.log("Ocurrió un error:");
        console.log(err);
        return throwError(() => "No existe modelo con ese ID");
      })
    );
  }

  /* findOne(id: number): Observable<Modelo> {
    return this.http.get<Modelo>(this.resourceUrl + '/' + id).pipe(
      catchError(err => {
        console.log(err.message);
        return throwError(() => 'Ocurrio un problema');
      })
    );
  } */

}
