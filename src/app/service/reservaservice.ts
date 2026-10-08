import { Injectable } from '@angular/core';
import { Reserva } from '../model/reservamodel';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private localStorageKey = 'marketplace_reservas';

  constructor() {}

  // 1. Obtener todas las reservas guardadas
  getReservas(): Reserva[] {
    const reservasData = localStorage.getItem(this.localStorageKey);
    return reservasData ? JSON.parse(reservasData) : [];
  }

  // 2. Guardar una nueva reserva
  guardarReserva(nuevaReserva: Reserva): void {
    const reservasActuales = this.getReservas();
    reservasActuales.push(nuevaReserva);
    localStorage.setItem(this.localStorageKey, JSON.stringify(reservasActuales));
  }
}
