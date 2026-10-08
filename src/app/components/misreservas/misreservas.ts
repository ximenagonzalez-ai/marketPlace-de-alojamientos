import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../service/reservaservice';
import { Reserva } from '../../model/reservamodel';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-misreservas',
  templateUrl: './misreservas.html',
  styleUrls: ['./misreservas.css'],
  imports: [DecimalPipe, DatePipe],
})
export class MisreservasComponent implements OnInit {
  // Arreglo donde se guardarán las reservas de la sesión
  listaReservas: Reserva[] = [];

  constructor(private reservaService: ReservaService) {}

  ngOnInit(): void {
    // Le pedimos al servicio las reservas almacenadas en el localStorage
    this.listaReservas = this.reservaService.getReservas();
  }
}
