import { Prestamo } from './Prestamo';
import{RolUsuario} from './RolUsuario';
export interface Usuario {
  id?: number;
  nombre?: string;
  email?: string;
  passwordHash?: string;
  rol?: RolUsuario;
  prestamos?: Prestamo[];
}