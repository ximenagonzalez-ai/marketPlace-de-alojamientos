import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Usuario {
  nombre: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuarioSubject = new BehaviorSubject<Usuario | null>(null);
  usuario$ = this.usuarioSubject.asObservable();

  constructor() {
    const sesionGuardada = localStorage.getItem('usuario_sesion');
    if (sesionGuardada) {
      this.usuarioSubject.next(JSON.parse(sesionGuardada));
    }
  }

  iniciarSesion(nombre: string, email: string) {
    const usuario: Usuario = { nombre, email };
    localStorage.setItem('usuario_sesion', JSON.stringify(usuario));
    this.usuarioSubject.next(usuario);
  }

  cerrarSesion() {
    localStorage.removeItem('usuario_sesion');
    this.usuarioSubject.next(null);
  }

  obtenerUsuarioActual(): Usuario | null {
    return this.usuarioSubject.value;
  }
}
