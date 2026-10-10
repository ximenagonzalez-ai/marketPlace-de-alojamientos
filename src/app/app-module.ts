import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Home } from './components/home/home';
import { AlojamientosList } from './components/alojamientos-list/alojamientos-list';
import { Navbarcomponent } from './components/navbarcomponent/navbarcomponent';
import { Footer } from './components/footer/footer';
import { Simularreserva } from './components/simularreserva/simularreserva';
import { DetalleAlojamiento } from './components/detalle-alojamiento/detalle-alojamiento';
import { Cotizacion } from './components/cotizacion/cotizacion';
import { Misreservas } from './components/misreservas/misreservas';
import { Login } from './components/login/login';

@NgModule({
  declarations: [
    App,
    Home,
    AlojamientosList,
    Navbarcomponent, // <--- Asegúrate de que esté aquí declarado
    Footer,
    DetalleAlojamiento,
    Cotizacion,
    Login,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CurrencyPipe,
    DatePipe,
    RouterLink,
    Simularreserva,
    Misreservas,
  ],
  providers: [provideBrowserGlobalErrorListeners(), provideHttpClient()],
  bootstrap: [App],
})
export class AppModule {}
