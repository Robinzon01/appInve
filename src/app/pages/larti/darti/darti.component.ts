import { Component, OnInit } from '@angular/core';
import { Idarti } from '../../../models/idarti';
import { ArticuloService } from '../../../services/articulo.service';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../../../models/usuario';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-darti',
  templateUrl: './darti.component.html',
  styleUrls: ['./darti.component.css']
})
export class DartiComponent implements OnInit {
  idArit: Idarti;
  articulo: any;
  constructor(private servArti: ArticuloService, private activateRote: ActivatedRoute) { }

  ngOnInit() {
    this.activateRote.paramMap.subscribe(params => {
      // let cia: string = params.get("cia");
      let usu = new Usuario();
      usu = JSON.parse(sessionStorage.getItem('usuario'));
     //  console.warn(usu.cia);
      let cod: string = params.get("cod");
      if (cod) {
          this.servArti.getShowArti(usu.cia, cod).subscribe( dato => {
             console.log(dato);
             this.articulo = dato;
          });
      }
    });
  }



}
