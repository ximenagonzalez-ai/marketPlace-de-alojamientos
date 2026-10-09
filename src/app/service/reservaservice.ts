import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Reserva } from '../model/reservamodel';

@Injectable({ providedIn: 'root' })
export class ReservaService {
  private reservasSubject = new BehaviorSubject<Reserva[]>(this.cargar());
  reservas$ = this.reservasSubject.asObservable();

  agregar(reserva: Omit<Reserva, 'id' | 'estado'>): Reserva {
    const actuales = this.reservasSubject.value;
    const nueva: Reserva = {
      ...reserva,
      id: actuales.length ? Math.max(...actuales.map((r) => r.id)) + 1 : 1,
      estado: 'CONFIRMADA',
    };
    this.actualizar([...actuales, nueva]);
    return nueva;
  }

  /** Elimina una reserva por su id. */
  eliminar(id: number): void {
    const restantes = this.reservasSubject.value.filter((r) => r.id !== id);
    this.actualizar(restantes);
  }

  /** Elimina todas las reservas. */
  eliminarTodas(): void {
    this.actualizar([]);
  }

  private actualizar(lista: Reserva[]): void {
    this.reservasSubject.next(lista);
    localStorage.setItem('reservas', JSON.stringify(lista));
  }

  private cargar(): Reserva[] {
    try {
      return JSON.parse(localStorage.getItem('reservas') ?? '[]');
    } catch {
      return [];
    }
  }
}
