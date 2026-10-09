import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ReservaService } from '../../service/reservaservice';
import { Reserva } from '../../model/reservamodel';

@Component({
  selector: 'app-misreservas',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, DatePipe],
  templateUrl: './misreservas.html',
  styleUrl: './misreservas.css',
})
export class Misreservas {
  private reservasService = inject(ReservaService);

  listaReservas: Reserva[] = [];

  constructor() {
    this.reservasService.reservas$
      .pipe(takeUntilDestroyed())
      .subscribe((reservas) => (this.listaReservas = reservas));
  }

  eliminarTodas(): void {
    if (confirm('¿Eliminar todas las reservas?')) {
      this.reservasService.eliminarTodas();
    }
  }
  eliminar(id: number): void {
    if (confirm('¿Eliminar esta reserva?')) {
      this.reservasService.eliminar(id);
    }
  }
}
