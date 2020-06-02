import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  usuario: Usuario;
  recordar = false;

  constructor( private servi: AuthService, private router: Router) { }

  ngOnInit() {
    this.usuario = new Usuario();
    if (localStorage.getItem('usuario')) {
        this.usuario.username = sessionStorage.getItem('user');
        this.recordar = true;
    }
  }
  // EVENTO PARA EL BOTON INGRESAR
  onSumit(form: NgForm) {

    if (form.invalid) {
      return;
    }
    // ALERTA
    Swal.fire({
      allowOutsideClick: false, // CLICK FUERA
      icon: 'info',
      text: 'Espere por favor...'
    });

    Swal.showLoading();

    this.servi.login(this.usuario).subscribe( rest => {
        Swal.close(); // SE CIERRA EL MENSAJE
        this.servi.guardarUsuario(rest.access_token);
        this.servi.guardarToken(rest.access_token);
        this.router.navigateByUrl('/home'); // NAVEGA HACIA EL HOME
      }, err => {
        if (err.status == 400) {
          Swal.fire('Error de Usuario o Clave incorrecta !!');
        }
    });

  }
}