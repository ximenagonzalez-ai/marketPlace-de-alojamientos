import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Home } from './components/home/home';
import { AlojamientosList } from './components/alojamientos-list/alojamientos-list';
import { Navbarcomponent } from './components/navbarcomponent/navbarcomponent';
import { Footer } from './components/footer/footer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MisReservasComponent } from './components/misreservas/misreservas';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Simularreserva } from './components/simularreserva/simularreserva';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [App, Home, AlojamientosList, Navbarcomponent, Footer],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MisReservasComponent,
    CurrencyPipe,
    DatePipe,
    RouterLink,
    Simularreserva,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
  ],
  bootstrap: [App],
})
export class AppModule {}
