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
          // this.usuarios = response.content as Usuario[];
          console.log(response.content);
          this.articulos = response.content;
          this.paginador = response;
        });
      }
    );
  }
  // METODO QUE NOS TRAE TODOS LOS ARTICULOS DE 15 EN 15


}
