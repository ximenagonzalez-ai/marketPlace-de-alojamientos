import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlojamientosList } from './alojamientos-list';

describe('AlojamientosList', () => {
  let component: AlojamientosList;
  let fixture: ComponentFixture<AlojamientosList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlojamientosList],
    }).compileComponents();

    fixture = TestBed.createComponent(AlojamientosList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
