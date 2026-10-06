import { Component } from '@angular/core';
import {Alojamiento} from '../../model/alojamientosmodel';
import {AlojamientoService} from '../../service/alojamientoservice';

@Component({
  selector: 'app-home',
  standalone: false,
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  alojamientosDestacados: Alojamiento[] = [];
  cargando: boolean = true;

  constructor(private alojamientoService: AlojamientoService) {}

  ngOnInit(): void {
    // Obtiene los 3 alojamientos con mejor calificación[cite: 1, 2]
    this.alojamientoService.getAlojamientosDestacados(3).subscribe({
      next: (data) => {
        this.alojamientosDestacados = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar alojamientos destacados:', err);
        this.cargando = false;
      }
    });
  }
}
