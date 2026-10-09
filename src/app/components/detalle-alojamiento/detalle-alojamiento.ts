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
  private cdr = inject(ChangeDetectorRef); // <- esta línea es la que usa this.cdr

  alojamiento?: Alojamiento;
  resenas: Resena[] = [];

  /** Llega desde <app-cotizacion> y se le pasa a <app-simularreserva>. */
  cotizacion: Cotizacion | null = null;

  cargando = true;
  error = false;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ID del alojamiento:', id);

    this.alojamientoService.getAlojamientoById(id).subscribe({
      next: (data) => {
        console.log('Alojamiento recibido:', data);
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
      complete: () => console.log('El servicio de alojamiento terminó'),
    });

    this.alojamientoService.getResenasByAlojamientoId(id).subscribe({
      next: (data) => {
        this.resenas = data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.log('Error al cargar reseñas:', error);
      },
    });
  }
}
