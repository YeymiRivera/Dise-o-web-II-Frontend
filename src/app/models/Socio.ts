import { Prestamo } from './Prestamo';

export interface Socio {
  id: number;
  nombre: string;
  ci: string;
  email?: string | null;
  telefono?: string | null;
  prestamos?: Prestamo[];
}