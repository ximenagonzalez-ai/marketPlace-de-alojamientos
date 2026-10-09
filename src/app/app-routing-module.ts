import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlojamientosList } from './components/alojamientos-list/alojamientos-list';
import { Home } from './components/home/home';
import { Simularreserva } from './components/simularreserva/simularreserva';
import { DetalleAlojamiento } from './components/detalle-alojamiento/detalle-alojamiento';
import { Misreservas } from './components/misreservas/misreservas';
import { Login } from './components/login/login'; // <--- 1. Importa el componente Login

const routes: Routes = [
  { path: 'reserva', component: Misreservas },
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'alojamientos', component: AlojamientosList },
  { path: 'simulador', component: Simularreserva },
  { path: 'alojamientos/:id', component: DetalleAlojamiento },
  { path: 'login', component: Login }, // <--- 2. Agrega la ruta para el login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
