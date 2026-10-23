import { Ejemplar } from './Ejemplar';
import { Socio } from './Socio';
import { Usuario } from './Usuario';
import { Multa } from './multa';

export interface Prestamo {
  id: number;
  fechaSalida: string;
  fechaLimite: string;
  fechaDevolucion: string | null;

  ejemplarId: number;
  ejemplar?: Ejemplar;

  socioId: number;
  socio?: Socio;

  usuarioId: number;
  usuario?: Usuario;

  multa?: Multa | null;

  descripcion?: string;
}