import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReservasService } from '../../service/reservaservice';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Reserva } from '../../model/reservamodel';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-mis-reservas',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, DatePipe],
  templateUrl: './misreservas.html',
  styleUrl: './misreservas.css',
})
export class MisReservasComponent {
  private reservasService = inject(ReservasService);

  listaReservas: Reserva[] = [];

  constructor() {
    this.reservasService.reservas$
      .pipe(takeUntilDestroyed())
      .subscribe((reservas) => (this.listaReservas = reservas));
  }
  eliminar(id: number): void {
    if (confirm('¿Eliminar esta reserva?')) {
      this.reservasService.eliminar(id);
    }
  }
}
