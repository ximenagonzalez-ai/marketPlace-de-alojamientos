import { Component, EventEmitter, Input, Output } from '@angular/core';

// La clase de este componente se llama Cotizacion, igual que el modelo.
// Por eso se importa el modelo con otro nombre (alias) para que no choquen.
import { Cotizacion as CotizacionModel } from '../../model/cotizacionmodel';

@Component({
  selector: 'app-cotizacion',
  standalone: false,
  templateUrl: './cotizacion.html',
  styleUrl: './cotizacion.css',
})
export class Cotizacion {
  @Input() precioNoche: number = 0;
  @Input() tarifaLimpieza: number = 0;
  @Input() capacidad: number = 0;

  /** Avisa al detalle con la cotización válida, o con null si no lo es. */
  @Output() cotizacionGenerada = new EventEmitter<CotizacionModel | null>();

  fechaEntrada: string = '';
  fechaSalida: string = '';
  numeroHuespedes: number = 1;

  noches: number = 0;
  subtotal: number = 0;
  tarifaServicio: number = 0;
  total: number = 0;

  error: string = '';

  /** Fecha de hoy en formato YYYY-MM-DD usando la hora local (no UTC). */
  hoy: string = this.fechaLocal(new Date());

  /** Se llama cada vez que el usuario cambia fechas o huéspedes. */
  actualizar(): void {
    this.reiniciarValores();

    // Todavía no hay datos suficientes: no es un error, solo no hay cotización.
    if (!this.fechaEntrada || !this.fechaSalida) {
      this.cotizacionGenerada.emit(null);
      return;
    }

    // Reglas de negocio
    if (this.precioNoche <= 0) {
      return this.fallar('El precio por noche no es válido.');
    }
    if (this.fechaEntrada < this.hoy) {
      return this.fallar('La fecha de llegada no puede ser anterior a hoy.');
    }
    if (this.fechaSalida <= this.fechaEntrada) {
      return this.fallar('La fecha de salida debe ser posterior a la de llegada.');
    }
    if (!this.numeroHuespedes || this.numeroHuespedes < 1) {
      return this.fallar('Debe haber al menos un huésped.');
    }
    if (this.numeroHuespedes > this.capacidad) {
      return this.fallar(`El alojamiento admite máximo ${this.capacidad} huéspedes.`);
    }

    this.calcularNoches();
    this.calcularTotal();

    this.cotizacionGenerada.emit({
      fechaLlegada: this.fechaEntrada,
      fechaSalida: this.fechaSalida,
      huespedes: this.numeroHuespedes,
      noches: this.noches,
      subtotal: this.subtotal,
      tarifaLimpieza: this.tarifaLimpieza,
      tarifaServicio: this.tarifaServicio,
      total: this.total,
    });
  }

  calcularNoches(): void {
    const entrada = new Date(this.fechaEntrada + 'T00:00:00');
    const salida = new Date(this.fechaSalida + 'T00:00:00');
    const diferencia = salida.getTime() - entrada.getTime();

    this.noches = Math.round(diferencia / (1000 * 60 * 60 * 24));
  }

  calcularTotal(): void {
    this.subtotal = this.noches * this.precioNoche;
    this.tarifaServicio = this.subtotal * 0.1;
    this.total = this.subtotal + this.tarifaLimpieza + this.tarifaServicio;
  }

  private fallar(mensaje: string): void {
    this.error = mensaje;
    this.cotizacionGenerada.emit(null);
  }

  private reiniciarValores(): void {
    this.error = '';
    this.noches = 0;
    this.subtotal = 0;
    this.tarifaServicio = 0;
    this.total = 0;
  }

  private fechaLocal(fecha: Date): string {
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    return `${año}-${mes}-${dia}`;
  }
}
