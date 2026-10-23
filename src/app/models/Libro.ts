import { Categoria } from './Categoria';
import { Ejemplar } from './Ejemplar';

export interface Libro {
  id: number;
  titulo: string;
  autor: string;
  isbn?: string | null;
  categoriaId: number;
  categoria?: Categoria;
  ejemplares?: Ejemplar[];
}