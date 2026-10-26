import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { api_config } from '../core/api_config';
import { Ejemplar, EstadoEjemplar } from '../models/Ejemplar';
import { LibroDto } from '../models/libro-dto';

export interface EjemplarInput {
  codigo: string;
  estado: EstadoEjemplar;
  libroId: number;
}

@Service()
export class Sejemplares {
  private readonly http = inject(HttpClient);
  private readonly url = api_config.baseurl + '/api/Ejemplares';

  getEjemplares(): Observable<Ejemplar[]> {
    return this.http.get<Ejemplar[]>(`${this.url}/GetEjemplares`);
  }

  getEjemplar(id: number): Observable<Ejemplar> {
    return this.http.get<Ejemplar>(`${this.url}/GetEjemplar/${id}`);
  }

  createEjemplar(ejemplar: EjemplarInput): Observable<Ejemplar> {
    return this.http.post<Ejemplar>(`${this.url}/CreateEjemplar`, ejemplar);
  }

  editEjemplar(id: number, ejemplar: EjemplarInput): Observable<Ejemplar> {
    return this.http.put<Ejemplar>(`${this.url}/EditEjemplar/${id}`, ejemplar);
  }

  deleteEjemplar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/EliminarEjemplar/${id}`);
  }

  /** Libros disponibles para elegir en el formulario (endpoint ya existente) */
  getLibros(): Observable<LibroDto[]> {
    return this.http.get<LibroDto[]>(api_config.baseurl + '/api/LibrosApi');
  }
}
