import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OtherService } from './other.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  constructor(private http: HttpClient, private other: OtherService) { }

  // METODO QUE NOS PERMITE TRAER TODOS LOS ARTICULOS CON SUS PRECIOS
  public getPagArti(usuario: Usuario, page: number): Observable<any> {
    return this.http.get<any>(this.other.getUrl() + `/arti/list/page/${usuario.cia}/${page}`).pipe(
      map(rest => {
         // console.log(rest.content);
         return rest;
      })
    );
  }

  // METODO QUE NOS PERMITE TRAER TODOS LOS ARTICULOS CON SUS PRECIOS Y DESCRIPCION
  public getPagArtiAndDesc(usuario: Usuario, desc: string, page: number): Observable<any> {
    return this.http.get<any>(this.other.getUrl() + `/arti/listd/page/${usuario.cia}/${desc}/${page}`).pipe(
      map(rest => {
         // console.log(rest.content);
         return rest;
      })
    );
  }

  // METODO QUE NOS PERMITE TRAER TODOS LOS ARTICULOS CON SUS PRECIOS Y DESCRIPCION
  public getPagArtiAndCodigo(usuario: Usuario, cod: string, page: number): Observable<any> {
    return this.http.get<any>(this.other.getUrl() + `/arti/listc/page/${usuario.cia}/${cod}/${page}`).pipe(
      map(rest => {
         // console.log(rest.content);
         return rest;
      })
    );
  }

  // LISTA DE ARTICULOS POR DESCRIPCION LIKE
  public listaArtiDesc( cia: string, desc: string): Observable<any> {
    return this.http.get<any>(this.other.getUrl() + `/arti/list/desc/${cia}/${desc}`).pipe(
      map(rest => {
         // console.log(rest);
         return rest;
      })
    );
  }
}
