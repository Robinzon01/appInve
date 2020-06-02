import { Component, OnInit } from '@angular/core';
import { OtherService } from '../../services/other.service';
import { Usuario } from '../../models/usuario';
import { CompanyService } from '../../services/company.service';
import { Company } from 'src/app/models/company';

@Component({
  selector: 'app-cabezera',
  templateUrl: './cabezera.component.html',
})
export class CabezeraComponent implements OnInit {
  public usuario = new Usuario();
  public company = new Company();

  constructor(private other: OtherService, private serviCompa: CompanyService) { 
    this.getCompany();
   }

  ngOnInit() {}

  // METODO QUE NOS PERMITE TRAER EL NOMBRE DE LA COMPAÑIA
  public getCompany() {
    // this.usuario = new Usuario();
    this.usuario = JSON.parse(sessionStorage.getItem('usuario'));
    // console.log(this.usuario);
    this.serviCompa.getCompany(this.usuario).subscribe(
      rest => {
        this.company = rest;
      }
    );
  }

}
