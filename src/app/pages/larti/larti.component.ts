import { Component, OnInit } from '@angular/core';
import { ArticuloService } from '../../services/articulo.service';
import { Usuario } from '../../models/usuario';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-larti',
  templateUrl: './larti.component.html'
})
export class LartiComponent implements OnInit {
  articulos: Array<any>;
  paginador: any;
  constructor(private serviArti: ArticuloService, private actiRouter: ActivatedRoute) { }

  ngOnInit() {
    this.actiRouter.paramMap.subscribe( params => {
      let page: number = +params.get('page');
      if (!page) { // SI NO EXISTE
        page = 0;
      }
      let usu = new Usuario();
      usu = JSON.parse(sessionStorage.getItem('usuario'));
      this.serviArti.getPagArti(usu, page).subscribe( response => {
         // console.log(response.content);
         // console.warn(this.getPrecioArti('01', '101308'));
          this.articulos = response.content;
          this.paginador = response;
        });
      }
    );
  }
  // PRECIO DEL ARTICULO
  /*
  public getPrecioArti(cia: string, arti: string): string {
    return this.serviArti.getPrecioArti(cia, arti).subscribe;
  }
  */
}
