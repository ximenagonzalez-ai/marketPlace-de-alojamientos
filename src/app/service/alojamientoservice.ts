import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Alojamiento} from '../model/alojamientosmodel';

@Injectable({
  providedIn: 'root'
})
export class AlojamientoService {
  private cliente : HttpClient=inject(HttpClient);
  // Ruta donde se almacena el archivo JSON[cite: 4]
  private dataUrl = 'assets/data/marketplace-data.json';




  // Obtiene todos los alojamientos activos[cite: 4]
  getAlojamientos(): Observable<Alojamiento[]> {
    return this.cliente.get<{ alojamientos: Alojamiento[] }>(this.dataUrl).pipe(
      map(response => response.alojamientos.filter(a => a.activo)) // Regla de negocio: No mostrar inactivos[cite: 4]
    );
  }

  // Obtiene los mejores alojamientos comparando y ordenando por calificación
  getAlojamientosDestacados(limit: number = 3): Observable<Alojamiento[]> {
    return this.getAlojamientos().pipe(
      map(alojamientos =>
        // Ordena de mayor a menor calificación[cite: 1, 2]
        alojamientos
          .sort((a, b) => b.calificacion - a.calificacion)
          .slice(0, limit)
      )
    );
  }
}
