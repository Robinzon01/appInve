import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ArticuloService } from '../../../services/articulo.service';
import {Observable} from 'rxjs';
import {map, startWith, flatMap} from 'rxjs/operators';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-barti',
  templateUrl: './barti.component.html'
})
export class BartiComponent implements OnInit {
  articulos: Array<any> = [];
  myControl = new FormControl();
  filteredOptions: Observable<Array<any>>;
  
  constructor(private serviArti: ArticuloService) {}

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      // startWith(''),
      map(value => typeof value === 'string' ? value : value.descripcion ),
      flatMap(value => value ? this._filter(value) : [])
    );
  }
  private _filter(value: string): Observable<Array<any>> {
    const filterValue = value.toLowerCase();
    // this.listaArtiDesc('01', value);
    // return this.articulos.filter(option => option.descripcion.toLowerCase().indexOf(filterValue) === 0);
    return this.serviArti.listaArtiDesc('01', value);
  }
  // METODO QUE NOS PERMITE BUSCAR UN ARTICULO POR DESCRIPCION
  public listaArtiDesc(cia: string, desc: string) {
    this.serviArti.listaArtiDesc(cia, desc).subscribe( response => {
      // console.log(response);
      this.articulos = response;
    });
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
  }

  mostrarNombre(item?: any): string | undefined {
    return item ? item.descripcion : undefined;
  }

  seleccionarItem(event: MatAutocompleteModule): void {
    /* let item = event.option.value as any;
    console.log(item); */
  }

}
