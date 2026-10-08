import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Alojamiento } from '../model/alojamientomodel';
import { Resena } from '../model/resena.model';

@Injectable({
  providedIn: 'root',
})
export class AlojamientoService {
  private cliente: HttpClient = inject(HttpClient);
  private dataUrl = 'assets/data/marketplace-data.json';




  // Obtiene todos los alojamientos activos[cite: 4]
  getAlojamientos(): Observable<Alojamiento[]> {
    return this.cliente
      .get<{ alojamientos: Alojamiento[] }>(this.dataUrl)
      .pipe(map((response) => response.alojamientos.filter((a) => a.activo)));
  }

  getAlojamientoById(id: number): Observable<Alojamiento | undefined> {
    return this.getAlojamientos().pipe(
      map((alojamientos) => alojamientos.find((a) => a.id === id)),
    );
  }

  getResenasByAlojamientoId(id: number): Observable<Resena[]> {
    return this.cliente
      .get<{ resenas: Resena[] }>(this.dataUrl)
      .pipe(map((response) => response.resenas.filter((r) => r.alojamientoId === id)));
  }

  getAlojamientosDestacados(limit: number = 3): Observable<Alojamiento[]> {
    return this.getAlojamientos().pipe(
      map((alojamientos) =>
        alojamientos.sort((a, b) => b.calificacion - a.calificacion).slice(0, limit),
      ),
    );
  }
}
