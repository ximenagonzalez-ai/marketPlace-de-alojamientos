import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetalleAlojamiento } from './components/detalle-alojamiento/detalle-alojamiento';
import { AlojamientosList } from './components/alojamientos-list/alojamientos-list';
import { Home } from './components/home/home';
import { Simularreserva } from './components/simularreserva/simularreserva';
import { Misreservas } from './components/misreservas/misreservas';
import { Login } from './components/login/login';

const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'alojamientos/:id', component: DetalleAlojamiento },
  { path: 'alojamientos', component: AlojamientosList },
  { path: 'simulador', component: Simularreserva },
  { path: 'reserva', component: Misreservas },
  { path: 'login', component: Login },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
