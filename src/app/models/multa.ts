import { Prestamo } from './Prestamo';

export interface Multa {
  id: number;
  monto: number;
  pagoRealizado: boolean;
  prestamoId: number;
  prestamo?:Prestamo;
}