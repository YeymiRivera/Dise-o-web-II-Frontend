import { Libro } from './Libro';

export interface Categoria {
  id: number;
  nombre: string;
  libros?: Libro[];
}