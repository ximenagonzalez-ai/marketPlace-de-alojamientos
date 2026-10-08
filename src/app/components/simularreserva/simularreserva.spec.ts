import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimularreservaComponent } from './simularreserva';

describe('Simularreserva', () => {
  let component: SimularreservaComponent;
  let fixture: ComponentFixture<SimularreservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SimularreservaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SimularreservaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
