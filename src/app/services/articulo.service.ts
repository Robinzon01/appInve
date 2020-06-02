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
  // METODO QUE NOS PERMITE TRAER TODOS LOS ARTICULOS
  public getPagArti(usuario: Usuario, page: number): Observable<any> {
    return this.http.get<any>(this.other.getUrl() + `/arti/list/page/${usuario.cia}/${page}`).pipe(
      map(rest => {
        return rest;
      })
    );
  }
}
