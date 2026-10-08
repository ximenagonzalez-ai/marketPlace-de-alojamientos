export interface Cotizacion {
  fechaLlegada: string; // 'YYYY-MM-DD'
  fechaSalida: string; // 'YYYY-MM-DD'
  huespedes: number;
  noches: number;
  subtotal: number; // noches × precioNoche
  tarifaLimpieza: number;
  tarifaServicio: number; // 10 % del subtotal
  total: number; // subtotal + limpieza + servicio
}
