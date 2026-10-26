import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { api_config } from '../core/api_config';
import { Socio } from '../models/Socio';

export interface SocioInput {
  nombre: string;
  ci: string;
  email: string | null;
  telefono: string | null;
}

@Service()
export class Ssocios {
  private readonly http = inject(HttpClient);
  private readonly url = api_config.baseurl + '/api/Socios';

  getSocios(): Observable<Socio[]> {
    return this.http.get<Socio[]>(`${this.url}/GetSocios`);
  }

  getSocio(id: number): Observable<Socio> {
    return this.http.get<Socio>(`${this.url}/GetSocio/${id}`);
  }

  createSocio(socio: SocioInput): Observable<Socio> {
    return this.http.post<Socio>(`${this.url}/CreateSocio`, socio);
  }

  editSocio(id: number, socio: SocioInput): Observable<Socio> {
    return this.http.put<Socio>(`${this.url}/EditSocio/${id}`, socio);
  }

  deleteSocio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/EliminarSocio/${id}`);
  }
}