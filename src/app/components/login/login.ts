import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/authservice';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  nombre: string = '';
  email: string = '';
  clave: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onRegister() {
    if (this.nombre.trim() && this.email.trim() && this.clave.trim()) {
      this.authService.iniciarSesion(this.nombre, this.email);
      alert(`¡Bienvenido/a, ${this.nombre}! Sesión iniciada correctamente.`);


      const urlPendiente = sessionStorage.getItem('url_pendiente');
      if (urlPendiente) {
        sessionStorage.removeItem('url_pendiente');
        this.router.navigateByUrl(urlPendiente);
      } else {
        this.router.navigate(['/home']);
      }
    } else {
      alert('Por favor completa todos los campos.');
    }
  }
}
