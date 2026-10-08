import { ComponentFixture, TestBed } from '@angular/core/testing';
import Simularreserva from './simularreserva';

describe('Simularreserva', () => {
  let component: Simularreserva;
  let fixture: ComponentFixture<Simularreserva>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Simularreserva],
    }).compileComponents();

    fixture = TestBed.createComponent(Simularreserva);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
