import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleAlojamiento } from './detalle-alojamiento';

describe('DetalleAlojamiento', () => {
  let component: DetalleAlojamiento;
  let fixture: ComponentFixture<DetalleAlojamiento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalleAlojamiento],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleAlojamiento);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
