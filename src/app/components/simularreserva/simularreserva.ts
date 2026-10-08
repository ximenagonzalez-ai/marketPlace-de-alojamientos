import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

// Ajusta estas rutas y nombres a los de tu proyecto
import { Alojamiento } from '../../model/alojamientomodel';
import { Cotizacion } from '../../model/cotizacionmodel';
import { Reserva } from '../../model/reservamodel';
import { ReservasService } from '../../service/reservaservice';

@Component({
  selector: 'app-simularreserva',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe, DatePipe, RouterLink],
  templateUrl: './simularreserva.html',
  styleUrl: './simularreserva.css',
})
export class Simularreserva {
  /** Alojamiento seleccionado en el detalle. */
  @Input({ required: true }) alojamiento!: Alojamiento;

  /** Cotización ya generada y válida. Si es null, no se puede reservar. */
  @Input() cotizacion: Cotizacion | null = null;

  /** Avisa al componente padre cuando la reserva quedó registrada. */
  @Output() reservaCreada = new EventEmitter<Reserva>();

  private fb = inject(FormBuilder);
  private reservasService = inject(ReservasService);

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

  /** Muestra el error solo si el usuario tocó el campo o intentó enviar. */
  mostrarError(control: { invalid: boolean; touched: boolean }): boolean {
    return control.invalid && (control.touched || this.intentoEnvio());
  }

  reservar(): void {
    this.intentoEnvio.set(true);

    // Regla de negocio: solo se reserva con una cotización válida.
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
