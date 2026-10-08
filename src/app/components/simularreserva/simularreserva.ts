import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservaService } from '../../service/reservaservice';
import { Reserva } from '../../model/reservamodel';
import { DecimalPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-simularreserva',
  templateUrl: './simularreserva.html',
  styleUrls: ['./simularreserva.css'],
  imports: [ReactiveFormsModule, NgClass, DecimalPipe],
})
export class SimularreservaComponent implements OnInit {
  reservaForm!: FormGroup;
  alojamientoId!: number;

  // Datos base simulados para cumplir con las reglas de negocio de la entrega
  nombreAlojamiento = 'Loft moderno en Chapinero';
  ciudad = 'Bogotá';
  precioNoche = 180000;
  tarifaLimpieza = 45000;
  capacidadMaxima = 2; // Regla: no superar la capacidad

  // Variables para cálculos automáticos de la cotización
  numeroNoches: number = 0;
  subtotal: number = 0;
  tarifaServicio: number = 0;
  total: number = 0;

  // Mensaje de error para las reglas de negocio de fechas
  errorFechas: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private reservaService: ReservaService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Captura el ID del alojamiento desde la URL de Angular
    this.alojamientoId = Number(this.route.snapshot.paramMap.get('id')) || 1;

    // Obtener la fecha de hoy en formato YYYY-MM-DD
    const hoy = new Date().toISOString().split('T')[0];

    // Formulario reactivo con las validaciones obligatorias
    this.reservaForm = this.fb.group({
      nombreHuesped: ['', [Validators.required, Validators.minLength(3)]],
      correoElectronico: ['', [Validators.required, Validators.email]],
      fechaLlegada: [hoy, Validators.required],
      fechaSalida: ['', Validators.required],
      numeroHuespedes: [
        1,
        [Validators.required, Validators.min(1), Validators.max(this.capacidadMaxima)],
      ],
    });

    // Escucha cambios en las fechas para recalcular la cotización al instante
    this.reservaForm.valueChanges.subscribe(() => {
      this.evaluarYCalcular();
    });
  }

  evaluarYCalcular(): void {
    const { fechaLlegada, fechaSalida } = this.reservaForm.value;

    if (!fechaLlegada || !fechaSalida) {
      this.reiniciarValores();
      return;
    }

    const inicio = new Date(fechaLlegada);
    const fin = new Date(fechaSalida);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    // Regla de negocio: Fecha de llegada no puede ser anterior a la actual
    if (inicio < hoy) {
      this.errorFechas = 'La fecha de llegada no puede ser anterior a la fecha actual.';
      this.reiniciarValores();
      return;
    }

    // Regla de negocio: Fecha de salida debe ser posterior a la de llegada
    if (fin <= inicio) {
      this.errorFechas = 'La fecha de salida debe ser posterior a la fecha de llegada.';
      this.reiniciarValores();
      return;
    }

    // Si pasa las validaciones, limpia el error y calcula los valores financieros
    this.errorFechas = null;
    const diferenciaTiempo = fin.getTime() - inicio.getTime();
    this.numeroNoches = Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24));

    // Fórmulas especificadas en la sección 3.4 del proyecto
    this.subtotal = this.numeroNoches * this.precioNoche;
    this.tarifaServicio = this.subtotal * 0.1; // 10% del subtotal
    this.total = this.subtotal + this.tarifaLimpieza + this.tarifaServicio;
  }

  reiniciarValores(): void {
    this.numeroNoches = 0;
    this.subtotal = 0;
    this.tarifaServicio = 0;
    this.total = 0;
  }

  confirmarReserva(): void {
    // Si el formulario es inválido o no se ha calculado el total, marca errores
    if (this.reservaForm.invalid || this.total === 0) {
      this.reservaForm.markAllAsTouched();
      return;
    }

    const valores = this.reservaForm.value;

    // Construcción del objeto mapeado al modelo
    const nuevaReserva: Reserva = {
      id: 'RES-' + Math.floor(1000 + Math.random() * 9000), // Código identificador
      alojamientoId: this.alojamientoId,
      nombreAlojamiento: this.nombreAlojamiento,
      ciudad: this.ciudad,
      fechaLlegada: valores.fechaLlegada,
      fechaSalida: valores.fechaSalida,
      numeroHuespedes: valores.numeroHuespedes,
      numeroNoches: this.numeroNoches,
      valorTotal: this.total,
      nombreHuesped: valores.nombreHuesped,
      correoElectronico: valores.correoElectronico,
      estado: 'CONFIRMADA', // Estado requerido por defecto
    };

    // Guarda los datos en el localStorage a través de tu servicio
    this.reservaService.guardarReserva(nuevaReserva);

    // Navega a la vista de tus consultas
    this.router.navigate(['/misreservas']);
  }
}

