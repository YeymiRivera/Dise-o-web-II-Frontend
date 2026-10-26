import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { api_config } from '../core/api_config';
import { Categoria } from '../models/Categoria';

@Service()
export class Scategorias {
  private readonly http = inject(HttpClient);
  private readonly url = api_config.baseurl + '/api/Categorias';

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.url}/GetCategorias`);
  }

  getCategoria(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.url}/GetCategoria/${id}`);
  }

  createCategoria(categoria: { nombre: string }): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.url}/CreateCategoria`, categoria);
  }

  editCategoria(id: number, categoria: { nombre: string }): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.url}/EditCategoria/${id}`, categoria);
  }

  deleteCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/EliminarCategoria/${id}`);
  }
}
