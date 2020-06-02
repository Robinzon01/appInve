import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  usuario = new Usuario();
  constructor(private router: Router) {
    this.usuario = JSON.parse(sessionStorage.getItem('usuario'));
    this.getMensaje(this.usuario);
  }

  ngOnInit() {}

  // METODO QUE NOS BRINDA EL MENSAJE DE BIENVENIDA
  public getMensaje(usuario: Usuario) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });
    Toast.fire({
      icon: 'success',
      title: `Bienvenido ${usuario.username}`
    });
  }

}// FIN
