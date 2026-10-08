import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Home } from './components/home/home';
import { AlojamientosList } from './components/alojamientos-list/alojamientos-list';
import { Navbarcomponent } from './components/navbarcomponent/navbarcomponent';
import { Footer } from './components/footer/footer';
import { ReactiveFormsModule } from '@angular/forms';
import { MisreservasComponent } from './components/misreservas/misreservas';
import { SimularreservaComponent } from './components/simularreserva/simularreserva';

@NgModule({
  declarations: [App, Home, AlojamientosList, Navbarcomponent, Footer],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, MisreservasComponent, SimularreservaComponent],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
