import { Component,ChangeDetectorRef } from '@angular/core';
import { inject,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { api_config } from '../../../core/api_config';
import { Prestamo } from '../../../models/Prestamo';
import { Multa } from '../../../models/multa';
import { Smultas } from '../../../services/smultas';
import { Router } from '@angular/router';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-create',
  styleUrl: './create.css',
  templateUrl: './create.html',
})
export class Create  {
  http=inject(HttpClient);
  url=api_config.baseurl+'/api/Multas/CreateMulta';
  private cdr = inject(ChangeDetectorRef);
   constructor(private router: Router) {}
  servicemultas=inject(Smultas);
prestamos:Prestamo[]=[];
cargandoPrestamos=true;
  nuevamulta: Multa = {
    monto: undefined,
    pagoRealizado: false,
    prestamoId: undefined,
  };
  postMulta():void
  {
   if(this.nuevamulta.monto==undefined||this.nuevamulta.monto<=0 || this.nuevamulta.prestamoId==undefined)
   {
    return alert("Llene todos los valores")}
   this.http.post(this.url,this.nuevamulta).subscribe({
    next:()=>{
      this.nuevamulta={
        monto:0,
        prestamoId:undefined,
        pagoRealizado:false
      }
      alert("Multa Creada");
      this.Volver();
    },
      error: (error) => {
        if (error.status === 409) {
          alert('Este préstamo ya tiene una multa.');
        } 
        else {
          console.error('Error al registrar la multa:', error);
        }
      }
      
    })
    }
   ngOnInit(): void {
  console.log('Iniciando carga de préstamos');

  this.servicemultas.getPrestamos().subscribe({
    next: (datos) => {
      this.prestamos = datos;
      this.cargandoPrestamos = false;
      this.cdr.detectChanges();
      
    },
    error: (error) => {
      console.error('Error al cargar préstamos:', error);
      this.cargandoPrestamos = false;
    }
  });
  }
  Volver(){
    this.router.navigate(['multas/index']);
  }
}
