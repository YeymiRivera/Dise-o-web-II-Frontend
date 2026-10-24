import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { api_config } from '../core/api_config';
import { Prestamo } from '../models/Prestamo';
import { Observable } from 'rxjs';
import { Multa } from '../models/multa';

@Service()
export class Smultas {
private http=inject(HttpClient)
private urlprestamos=api_config.baseurl+'/api/Prestamos/GetPrestamos';
private urlmultas =
    api_config.baseurl + '/api/Multas/GetMultas';
getPrestamos(): Observable<Prestamo[]> {
  return this.http.get<Prestamo[]>(this.urlprestamos)
}
 getMultas(): Observable<Multa[]> {
  return this.http.get<Multa[]>(this.urlmultas)}
}

