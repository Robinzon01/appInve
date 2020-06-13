import { Component, OnInit } from '@angular/core';
import { Idarti } from '../../../models/idarti';
import { ArticuloService } from '../../../services/articulo.service';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../../../models/usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-darti',
  templateUrl: './darti.component.html',
  styleUrls: ['./darti.component.css']
})
export class DartiComponent implements OnInit {
  idArit: Idarti;
  articulo: any;
  private fotoSelec: File;
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
// console.log(dato);
             this.articulo = dato;
          });
      }
    });
  }
  // SELECCIONAR FOTO 
  public seleccionarFoto(event) {
    this.fotoSelec = event.target.files[0];
    // console.log(this.fotoSelec);
  }
  // SUBIR FOTO
  public subirFoto() {
    console.log(this.fotoSelec);
    this.servArti.subirFoto(this.fotoSelec, this.articulo.idArti.cia, this.articulo.idArti.noArti).
    subscribe(data => {
      this.articulo = data;
      Swal.fire('La foto se ha subido completamente !');
    });
  }


}
