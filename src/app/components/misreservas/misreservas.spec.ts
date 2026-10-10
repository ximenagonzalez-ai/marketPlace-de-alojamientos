import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Misreservas } from './misreservas';

describe('Misreservas', () => {
  let component: Misreservas;
  let fixture: ComponentFixture<Misreservas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Al ser standalone, se importa en lugar de declararse
      imports: [Misreservas],
      providers: [
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Misreservas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
