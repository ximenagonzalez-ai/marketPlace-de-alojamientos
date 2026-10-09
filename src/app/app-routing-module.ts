import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleAlojamiento } from './components/detalle-alojamiento/detalle-alojamiento';
import {AlojamientosList} from './components/alojamientos-list/alojamientos-list';
import {Home} from './components/home/home';
import { Simularreserva } from './components/simularreserva/simularreserva';
import { DetalleAlojamiento } from './components/detalle-alojamiento/detalle-alojamiento';
import { Misreservas } from './components/misreservas/misreservas';

const routes: Routes = [
  { path: 'reserva', component: Misreservas },
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'alojamientos', component: AlojamientosList },
  { path: 'simulador', component: Simularreserva },
  { path: 'alojamientos/:id', component: DetalleAlojamiento }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
