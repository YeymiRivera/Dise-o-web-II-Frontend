import { Component, inject } from '@angular/core';
import { appConfig } from '../../../app.config';
import { api_config } from '../../../core/api_config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Multa } from '../../../models/multa';
import { AsyncPipe } from '@angular/common';

@Component({
  imports: [AsyncPipe],
  selector: 'app-index',
  styleUrl: './index.css',
  templateUrl: './index.html',
})
export class Index {
  private http=inject(HttpClient);
  private url=api_config.baseurl;
  getMultas():Observable<Multa[]>{
    return this.http.get<Multa[]>(this.url)
  }
  multas=this.getMultas();
  crearMulta(): void {
  alert('Preparado para crear una multa');
}

editarMulta(id: number): void {
  console.log('Preparado para editar la multa:', id);
}

eliminarMulta(id: number): void {
  console.log('Preparado para eliminar la multa:', id);
}
}
