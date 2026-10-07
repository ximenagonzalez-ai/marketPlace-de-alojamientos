import { Component, OnInit, signal } from '@angular/core';
import { Alojamiento } from '../../model/alojamientosmodel';
import { AlojamientoService } from '../../service/alojamientoservice';

@Component({
  selector: 'app-home',
  standalone: false,
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home implements OnInit {
  alojamientosDestacados = signal<Alojamiento[]>([]);
  cargando = signal(true);

  constructor(private alojamientoService: AlojamientoService) {}

  ngOnInit(): void {
    this.alojamientoService.getAlojamientosDestacados(3).subscribe({
      next: (data) => {
        this.alojamientosDestacados.set(data);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error al cargar alojamientos destacados:', err);
        this.cargando.set(false);
      }
    });
  }
}
