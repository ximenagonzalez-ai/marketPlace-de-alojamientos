import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleAlojamiento } from './components/detalle-alojamiento/detalle-alojamiento';

const routes: Routes = [
  {
    path: 'alojamientos/:id',
    component: DetalleAlojamiento,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
