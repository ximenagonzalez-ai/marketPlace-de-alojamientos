import { Component, OnInit } from '@angular/core';
import { AuthService, Usuario } from '../../service/authservice';

@Component({
  selector: 'app-navbarcomponent',
  standalone: false,
  styleUrl: './navbarcomponent.css',
  templateUrl: './navbarcomponent.html',
})
export class Navbarcomponent implements OnInit {
  usuarioActual: Usuario | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Escucha en tiempo real si el usuario inicia o cierra sesión
    this.authService.usuario$.subscribe(user => {
      this.usuarioActual = user;
    });
  }

  logout() {
    this.authService.cerrarSesion();
  }
}
