export type EstadoReserva = 'CONFIRMADA' | 'CANCELADA';

export interface Reserva {
  id: number;
  alojamiento: {
    id: number;
    nombre: string;
    ciudad: string;
    imagenPrincipal: string;
  };
  fechaLlegada: string; // 'YYYY-MM-DD'
  fechaSalida: string;
  huespedes: number;
  noches: number;
  total: number;
  nombreHuesped: string;
  correo: string;
  estado: EstadoReserva;
}
