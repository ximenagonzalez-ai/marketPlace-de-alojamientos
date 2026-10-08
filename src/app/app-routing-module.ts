import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisreservasComponent } from './components/misreservas/misreservas';
import {AlojamientosList} from './components/alojamientos-list/alojamientos-list';
import {Home} from './components/home/home';

const routes: Routes = [
  {path : 'reserva', component: MisreservasComponent},
  {path : 'home', component: Home},
  { path: 'alojamientos', component: AlojamientosList }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
