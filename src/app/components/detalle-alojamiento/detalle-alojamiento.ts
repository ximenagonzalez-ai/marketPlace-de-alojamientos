import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlojamientoService } from '../../service/alojamientoservice';
import { Alojamiento} from '../../model/alojamientomodel';
import { Resena } from '../../model/resena.model';

@Component({
  selector: 'app-detalle-alojamiento',
  standalone: false,
  templateUrl: './detalle-alojamiento.html',
  styleUrl: './detalle-alojamiento.css',
})
export class DetalleAlojamiento implements OnInit {
  private route = inject(ActivatedRoute);
  private alojamientoService = inject(AlojamientoService);
  private cdr = inject(ChangeDetectorRef);
  alojamiento?: Alojamiento;
  resenas: Resena[] = [];

  cargando = true;
  error = false;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('URL actual:', this.route.snapshot.url);
    console.log('Parámetros:', this.route.snapshot.paramMap.get('id'));
    console.log('ID del alojamiento:', id);

    this.alojamientoService.getAlojamientoById(id).subscribe({
      next: (data) => {
        this.alojamiento = data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.log('Error al cargar alojamiento:', error);
        this.error = true;
        this.cargando = false;
        this.cdr.detectChanges();
      },
    });

    this.alojamientoService.getResenasByAlojamientoId(id).subscribe({
      next: (data) => {
        this.resenas = data;
      },
      error: (error) => {
        console.log('Error al cargar reseñas:', error);
      },
    });
  }
}
