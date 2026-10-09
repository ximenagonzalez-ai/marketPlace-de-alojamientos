import { Component, EventEmitter, Input, Output, OnInit, inject, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { Alojamiento } from '../../model/alojamientomodel';
import { Cotizacion } from '../../model/cotizacionmodel';
import { Reserva } from '../../model/reservamodel';
import { ReservaService } from '../../service/reservaservice';
import { AuthService } from '../../service/authservice';

@Component({
  selector: 'app-simularreserva',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe, DatePipe, RouterLink],
  templateUrl: './simularreserva.html',
  styleUrl: './simularreserva.css',
})
export class Simularreserva implements OnInit {
  @Input({ required: true }) alojamiento!: Alojamiento;
  @Input() cotizacion: Cotizacion | null = null;
  @Output() reservaCreada = new EventEmitter<Reserva>();

  private fb = inject(FormBuilder);
  private reservasService = inject(ReservaService);
  private authService = inject(AuthService);
  private router = inject(Router);

  reservaConfirmada = signal<Reserva | null>(null);
  intentoEnvio = signal(false);

  form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    correo: ['', [Validators.required, Validators.email]],
  });

  get nombre() {
    return this.form.controls.nombre;
  }

  get correo() {
    return this.form.controls.correo;
  }

  ngOnInit(): void {

    const usuarioActual = this.authService.obtenerUsuarioActual();
    if (usuarioActual) {
      this.form.patchValue({
        nombre: usuarioActual.nombre,
        correo: usuarioActual.email
      });
    }
  }

  mostrarError(control: { invalid: boolean; touched: boolean }): boolean {
    return control.invalid && (control.touched || this.intentoEnvio());
  }

  reservar(): void {
    this.intentoEnvio.set(true);


    const usuarioActual = this.authService.obtenerUsuarioActual();
    if (!usuarioActual) {
      alert('Debes iniciar sesión o registrarte para poder realizar una reserva.');
      // Guardamos la URL actual para regresar aquí después del login
      sessionStorage.setItem('url_pendiente', this.router.url);
      this.router.navigate(['/login']);
      return;
    }


    if (!this.cotizacion) {
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { nombre, correo } = this.form.getRawValue();


    const nueva = this.reservasService.agregar({
      alojamiento: {
        id: this.alojamiento.id,
        nombre: this.alojamiento.nombre,
        ciudad: this.alojamiento.ciudad,
        imagenPrincipal: this.alojamiento.imagenPrincipal,
      },
      fechaLlegada: this.cotizacion.fechaLlegada,
      fechaSalida: this.cotizacion.fechaSalida,
      huespedes: this.cotizacion.huespedes,
      noches: this.cotizacion.noches,
      total: this.cotizacion.total,
      nombreHuesped: nombre.trim(),
      correo: correo.trim(),
    });

    this.reservaConfirmada.set(nueva);
    this.reservaCreada.emit(nueva);
  }
}
