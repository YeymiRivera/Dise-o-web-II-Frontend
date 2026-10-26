import { Libro } from './Libro';
import { Prestamo } from './Prestamo';

export enum EstadoEjemplar {
  Disponible = 0,
  Prestado = 1,
  EnReparacion = 2
}

export const ESTADOS_EJEMPLAR = [
  { valor: EstadoEjemplar.Disponible, nombre: 'Disponible' },
  { valor: EstadoEjemplar.Prestado, nombre: 'Prestado' },
  { valor: EstadoEjemplar.EnReparacion, nombre: 'En reparación' }
];

export interface Ejemplar {
  id: number;
  codigo: string;
  estado: EstadoEjemplar;
  libroId: number;
  libro?: Libro;
  prestamos?: Prestamo[];
}