import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Home } from './components/home/home';
import { AlojamientosList } from './components/alojamientos-list/alojamientos-list';
import { Navbarcomponent } from './components/navbarcomponent/navbarcomponent';
import { Footer } from './components/footer/footer';
imports: [BrowserModule, AppRoutingModule, FormsModule];
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Simularreserva } from './components/simularreserva/simularreserva';
import { MisReservasComponent } from './components/misreservas/misreservas';
import { DetalleAlojamiento } from './components/detalle-alojamiento/detalle-alojamiento';
import { Cotizacion } from './components/cotizacion/cotizacion';

@NgModule({
  declarations: [
    App,
    Home,
    AlojamientosList,
    Navbarcomponent,
    Footer,
    DetalleAlojamiento,
    Cotizacion,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MisReservasComponent,
    CurrencyPipe,
    ReactiveFormsModule,
    DatePipe,
    RouterLink,
    Simularreserva,
  ],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
