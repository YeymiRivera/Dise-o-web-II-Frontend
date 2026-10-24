import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
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
  private servicemultas=inject(Smultas)
  private cdr=inject(ChangeDetectorRef)
    constructor(private router: Router) {}
  cargando = true;
  error = '';
  multas:Multa[]=[];
 ngOnInit(): void {
  this.servicemultas.getMultas().subscribe({
    next: (datos) => {
      this.multas = datos;
      this.cdr.detectChanges();
      
    },
    error: (error) => {
      console.error('Error al cargar préstamos:', error);
    }
  });
  }
 crearMulta(): void {
  this.router.navigate(['/multas/create']);
}

  editarMulta(id:number|undefined): void {
    if(id===undefined){console.log("Error"); return }
    this.router.navigate(['/multas/editar', id] );
  }

  eliminarMulta(): void {
    console.log('Preparado para eliminar la multa:', );
  }
}