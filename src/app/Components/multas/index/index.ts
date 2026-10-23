import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Observable, catchError, of, tap } from 'rxjs';

import { api_config } from '../../../core/api_config';
import { Multa } from '../../../models/multa';
import { Smultas } from '../../../services/smultas';

@Component({
  selector: 'app-index-multas',
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Index {
  private http = inject(HttpClient);
  private url =
    api_config.baseurl + '/api/Multas/GetMultas';

  cargando = true;
  error = '';

 getMultas(): Observable<Multa[]> {
  return this.http.get<Multa[]>(this.url)}


  multas = this.getMultas();

  crearMulta(): void {
    alert('Preparado para crear una multa');
  }

  editarMulta(): void {
    console.log('Preparado para editar la multa:', );
  }

  eliminarMulta(): void {
    console.log('Preparado para eliminar la multa:', );
  }
}