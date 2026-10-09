import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AlojamientosList} from './components/alojamientos-list/alojamientos-list';
import {Home} from './components/home/home';
import { MisReservasComponent } from './components/misreservas/misreservas';
import { Simularreserva } from './components/simularreserva/simularreserva';
import { DetalleAlojamiento } from './components/detalle-alojamiento/detalle-alojamiento';

const routes: Routes = [
  { path: 'reserva', component: MisReservasComponent },
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'alojamientos', component: AlojamientosList },
  { path: 'simulador', component: Simularreserva },
  { path: 'alojamientos/id', component: DetalleAlojamiento }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
