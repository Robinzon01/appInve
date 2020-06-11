import { Component, OnInit } from '@angular/core';
import { ArticuloService } from '../../services/articulo.service';
import { Usuario } from '../../models/usuario';
import { ActivatedRoute } from '@angular/router';

import {Observable} from 'rxjs';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {map, startWith, flatMap} from 'rxjs/operators';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-larti',
  templateUrl: './larti.component.html'
})
export class LartiComponent implements OnInit {
  articulos: Array<any> = [];
  paginador: any;

  myControl = new FormControl();
  filteredOptions: Observable<Array<any>>;

  formulario: FormGroup;

  constructor(private serviArti: ArticuloService, private actiRouter: ActivatedRoute, private fb: FormBuilder) { 
    this.crearFormulario();
  }

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
    // BUSCAR ITEMS
    this.filteredOptions = this.myControl.valueChanges.pipe(
      // startWith(''),
      map(value => typeof value === 'string' ? value : value.descripcion ),
      flatMap(value => value ? this._filter(value) : [])
    );
  }
  crearFormulario(): void {
    this.formulario = this.fb.group({
      item: ['CUA', Validators.required]
    });
  }
  guardar(): void {
    // console.log(this.formulario.get('item').value);
    /* if (this.formulario.invalid) {
      return;
    } */
    // console.log('=)2');
    /*
    this.actiRouter.paramMap.subscribe( params => {
    let page: number = +params.get('page');
    if (!page) { // SI NO EXISTE
        page = 0;
      }

    let usu = new Usuario();
    usu = JSON.parse(sessionStorage.getItem('usuario'));
    this.serviArti.getPagArtiAndDesc(usu, 'COMUNICACIÓN' , page).subscribe( response => {
          this.articulos = response.content;
          this.paginador = response;
        });
    });
    */
  }
  private _filter(value: string): Observable<Array<any>> {
    const filterValue = value.toLowerCase();
    // this.listaArtiDesc('01', value);
    // return this.articulos.filter(option => option.descripcion.toLowerCase().indexOf(filterValue) === 0);
    return this.serviArti.listaArtiDesc('01', value);
  }

  mostrarNombre(item?: any): string | undefined {
    return item ? item.descripcion : undefined;
  }

  seleccionarItem(event: MatAutocompleteModule): void {
    const item = event.option.value as any;
    /* console.log(item.idArti.noArti);
    console.log(item); */
    this.actiRouter.paramMap.subscribe( params => {
      let page: number = +params.get('page');
      if (!page) { // SI NO EXISTE
        page = 0;
      }
      let usu = new Usuario();
      usu = JSON.parse(sessionStorage.getItem('usuario'));
      this.serviArti.getPagArtiAndCodigo(usu, item.idArti.noArti , page).subscribe( response => {
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
