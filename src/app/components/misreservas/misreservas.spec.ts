import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MisreservasComponent } from './misreservas';

describe('Misreservas', () => {
  let component: MisreservasComponent;
  let fixture: ComponentFixture<MisreservasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MisreservasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MisreservasComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
