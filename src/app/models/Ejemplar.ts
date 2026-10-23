import { Libro } from './Libro';
import { Prestamo } from './Prestamo';

export enum EstadoEjemplar {
  Disponible = 0,
  Prestado = 1,
  Dañado = 2
}

export interface Ejemplar {
  id: number;
  codigo: string;
  estado: EstadoEjemplar;
  libroId: number;
  libro?: Libro;
  prestamos?: Prestamo[];
}