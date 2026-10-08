import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AlojamientosList} from './components/alojamientos-list/alojamientos-list';
import {Home} from './components/home/home';

const routes: Routes = [
  { path: '', component: Home },
  { path: 'alojamientos', component: AlojamientosList }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
