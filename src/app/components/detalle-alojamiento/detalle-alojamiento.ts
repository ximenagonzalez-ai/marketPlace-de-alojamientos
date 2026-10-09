import { Component, inject, OnInit } from '@angular/core';
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

  alojamiento?: Alojamiento;
  resenas: Resena[] = [];

  cargando = true;
  error = false;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.alojamientoService.getAlojamientoById(id).subscribe({
      next: (data) => {
        this.alojamiento = data;
        this.cargando = false;
      },
      error: () => {
        this.error = true;
        this.cargando = false;
      },
    });

    this.alojamientoService.getResenasByAlojamientoId(id).subscribe({
      next: (data) => {
        this.resenas = data;
      },
    });
  }
}
