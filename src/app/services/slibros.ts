import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { api_config } from '../core/api_config';
import { LibroDto } from '../models/libro-dto';

export interface LibroDetalle {
  id: number;
  titulo: string;
  autor: string;
  isbn: string | null;
  categoria: string;
  categoriaId: number;
}

export interface LibroInput {
  titulo: string;
  autor: string;
  isbn: string | null;
  categoriaId: number;
}

@Service()
export class Slibros {
  private readonly http = inject(HttpClient);
  private readonly url = api_config.baseurl + '/api/LibrosApi';

  getLibros(): Observable<LibroDto[]> {
    return this.http.get<LibroDto[]>(this.url);
  }

  getLibro(id: number): Observable<LibroDetalle> {
    return this.http.get<LibroDetalle>(`${this.url}/${id}`);
  }

  createLibro(libro: LibroInput): Observable<LibroDetalle> {
    return this.http.post<LibroDetalle>(`${this.url}/CreateLibro`, libro);
  }

  editLibro(id: number, libro: LibroInput): Observable<LibroDetalle> {
    return this.http.put<LibroDetalle>(`${this.url}/EditLibro/${id}`, libro);
  }

  deleteLibro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/EliminarLibro/${id}`);
  }
}