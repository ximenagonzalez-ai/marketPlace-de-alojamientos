import {Component, inject, OnInit, signal} from '@angular/core';
import {AlojamientoService} from '../../service/alojamientoservice';
import {Alojamiento} from '../../model/alojamientomodel';

@Component({
  selector: 'app-alojamientos-list',
  standalone: false,
  styleUrl: './alojamientos-list.css',
  templateUrl: './alojamientos-list.html',
})
export class AlojamientosList implements OnInit {
  private alojamientoService = inject(AlojamientoService);

  alojamientos = signal<Alojamiento[]>([]);
  cargando = signal(true);
  error = signal(false);

  ngOnInit(): void {
    this.alojamientoService.getAlojamientos().subscribe({
      next: (data) => {
        this.alojamientos.set(data);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error al cargar alojamientos:', err);
        this.error.set(true);
        this.cargando.set(false);
      }
    });
  }
}
