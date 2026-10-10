import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Simularreserva } from './simularreserva';

describe('Simularreserva', () => {
  let component: Simularreserva;
  let fixture: ComponentFixture<Simularreserva>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Simularreserva],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Simularreserva);
    component = fixture.componentInstance;


    component.alojamiento = {
      id: 1,
      nombre: 'Alojamiento de prueba',
      ciudad: 'Bogotá',
      imagenPrincipal: 'assets/test.jpg',
      descripcion: 'Descripción de prueba',
      precioPorNoche: 100000,
      capacidad: 2,
      servicios: [],
      calificacion: 4.8,
      activo: true,
    } as any;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
