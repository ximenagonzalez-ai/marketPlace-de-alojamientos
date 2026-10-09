import { Component, Input } from '@angular/core';

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

  fechaEntrada: string = '';
  fechaSalida: string = '';
  numeroHuespedes: number = 1;

  noches: number = 0;
  subtotal: number = 0;
  tarifaServicio: number = 0;
  total: number = 0;

  calcularNoches(): void {
    if (!this.fechaEntrada || !this.fechaSalida) {
      this.noches = 0;
      this.calcularTotal();
      return;
    }

    const entrada = new Date(this.fechaEntrada + 'T00:00:00');
    const salida = new Date(this.fechaSalida + 'T00:00:00');

    const diferencia = salida.getTime() - entrada.getTime();

    this.noches = diferencia > 0 ? Math.ceil(diferencia / (1000 * 60 * 60 * 24)) : 0;

    this.calcularTotal();
  }

  calcularTotal(): void {
    this.subtotal = this.noches * this.precioNoche;
    this.tarifaServicio = this.subtotal * 0.1;
    this.total = this.subtotal + this.tarifaLimpieza + this.tarifaServicio;
  }
}
