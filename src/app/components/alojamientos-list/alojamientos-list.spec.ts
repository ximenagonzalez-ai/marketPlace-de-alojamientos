import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlojamientosList } from './alojamientos-list';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';

describe('AlojamientosList', () => {
  let component: AlojamientosList;
  let fixture: ComponentFixture<AlojamientosList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlojamientosList],
      imports: [FormsModule, RouterModule.forRoot([])],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(AlojamientosList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
