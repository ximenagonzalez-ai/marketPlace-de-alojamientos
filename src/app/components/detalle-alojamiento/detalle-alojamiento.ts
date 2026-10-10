import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlojamientoService } from '../../service/alojamientoservice';
import { Alojamiento } from '../../model/alojamientomodel';
import { Resena } from '../../model/resena.model';
import { Cotizacion } from '../../model/cotizacionmodel';

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
  cotizacion: Cotizacion | null = null;

  cargando = true;
  error = false;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.alojamientoService.getAlojamientoById(id).subscribe({
      next: (data) => {
        this.alojamiento = data;
        this.error = !data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar alojamiento:', error);
        this.error = true;
        this.cargando = false;
        this.cdr.detectChanges();
      },
    });

    this.alojamientoService.getResenasByAlojamientoId(id).subscribe({
      next: (data) => {
        this.resenas = data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar reseñas:', error);
      },
    });
  }
}

