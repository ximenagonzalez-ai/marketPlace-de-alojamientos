export interface Reserva {
  id: string;
  alojamientoId: number;
  nombreAlojamiento: string;
  ciudad: string;
  fechaLlegada: string;
  fechaSalida: string;
  numeroHuespedes: number;
  numeroNoches: number;
  valorTotal: number;
  nombreHuesped: string;
  correoElectronico: string;
  estado: 'CONFIRMADA';
}
