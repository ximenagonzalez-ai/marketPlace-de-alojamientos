import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { AlojamientoService } from '../../service/alojamientoservice';
import { Alojamiento } from '../../model/alojamientomodel';

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

  ciudadFiltro = signal<string>('');
  huespedesFiltro = signal<number | null>(null);
  tipoFiltro = signal<string>('');
  precioMaxFiltro = signal<number | null>(null);

  tiposAlojamiento = ['Apartamento', 'Cabaña', 'Casa'];

  private normalizarTexto(texto: string): string {
    return (texto || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  alojamientosFiltrados = computed(() => {
    const lista = this.alojamientos();
    const ciudad = this.normalizarTexto(this.ciudadFiltro());
    const huespedes = this.huespedesFiltro();
    const tipo = this.tipoFiltro();
    const precioMax = this.precioMaxFiltro();

    return lista.filter((alojamiento) => {

      if (!alojamiento.activo) return false;


      if (ciudad) {
        const ciudadAlojamiento = this.normalizarTexto(alojamiento.ciudad);
        if (!ciudadAlojamiento.includes(ciudad)) {
          return false;
        }
      }


      if (huespedes && huespedes > 0 && alojamiento.capacidad < huespedes) {
        return false;
      }


      if (tipo && alojamiento.tipo !== tipo) {
        return false;
      }


      if (precioMax && precioMax > 0 && alojamiento.precioNoche > precioMax) {
        return false;
      }

      return true;
    });
  });

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
      },
    });
  }


  onCiudadChange(val: string): void {
    this.ciudadFiltro.set(val);
  }

  onHuespedesChange(val: number | null): void {
    this.huespedesFiltro.set(val);
  }

  onTipoChange(val: string): void {
    this.tipoFiltro.set(val);
  }

  onPrecioMaxChange(val: number | null): void {
    this.precioMaxFiltro.set(val);
  }


  limpiarFiltros(): void {
    this.ciudadFiltro.set('');
    this.huespedesFiltro.set(null);
    this.tipoFiltro.set('');
    this.precioMaxFiltro.set(null);
  }
}
