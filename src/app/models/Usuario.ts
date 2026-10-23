import { Prestamo } from './Prestamo';

export enum RolUsuario {
  OperadorDeAtencion = 0,
  Admin = 1
}

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  passwordHash: string;
  rol: RolUsuario;
  prestamos?: Prestamo[];
}