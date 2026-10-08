import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Home } from './components/home/home';
import { AlojamientosList } from './components/alojamientos-list/alojamientos-list';
import { Navbarcomponent } from './components/navbarcomponent/navbarcomponent';
import { Footer } from './components/footer/footer';
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
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
