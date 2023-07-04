import { Injectable } from '@angular/core';
import { Persona } from '../models/persona';
import { catchError, first, map, mergeMap, Observable, of, throwError } from "rxjs";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environments';

export interface PersonDTO{
  id: number,
  age: number,
  name: string,
  lastName: string,
}

@Injectable({providedIn: 'root'})

export class PersonaService {

  resourceUrl = environment.backendUrl + "personas"

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
        return throwError(() => "No existe persona con ese ID");
      })
    );
  }

  modifPersona(persona: PersonDTO): Observable<any>{
    return this.http.put<any>(this.resourceUrl + '/' + persona.id, persona).pipe(
      catchError(err => {
        console.log("Ocurrió un error:");
        console.log(err);
        return throwError(() => "Paso algo");
      })
    )
  }

  crearPersona(persona: PersonDTO): Observable<any> {
    return this.http.post<any>(this.resourceUrl, persona).pipe(
      catchError(err => {
        console.log("Ocurrio un error: ");
        console.log(err);
        return throwError(() => "No se pudo crear la persona");
      }),
    );
  }

  borrar(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>( this.resourceUrl + '/' + id, {observe: "response"}).pipe(
      catchError(err => {
        console.log("Ocurrio un error: ");
        console.log(err);
        return throwError(() => "No existe la persona");
      }),
    );
  }
}
