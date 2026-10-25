import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Smultas } from '../../../services/smultas';
import { Multa } from '../../../models/multa';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Prestamo } from '../../../models/Prestamo';
import { HttpClient } from '@angular/common/http';
import { api_config } from '../../../core/api_config';
@Component({
  imports: [FormsModule],
  selector: 'app-editar',
  styleUrl: './editar.css',
  templateUrl: './editar.html',
})
export class Editar {
  private http=inject(HttpClient);
  private url=api_config.baseurl+'/api/Multas/EditMultas';
constructor(private route: ActivatedRoute,private router: Router) {};
private servicemultas=inject(Smultas);
private cdr=inject(ChangeDetectorRef);
prestamoId=0;
multas:Multa[]=[];
multaeditada?:Multa;
prestamos:Prestamo[]=[];
prestamo?:Prestamo;
ngOnInit(): void {
   this.prestamoId = Number(
    this.route.snapshot.paramMap.get('id')
  );
  this.servicemultas.getMultas().subscribe({
    next: (datos) => {
      this.multas = datos;
      this.multaeditada=this.multas.find((m)=>(m.prestamoId===this.prestamoId))
      if (!this.multaeditada) {
        console.log('Multa no encontrada:', this.multaeditada);
      }
      this.cdr.detectChanges();
    },
    error: (error) => {
      console.error('Error al multas:', error);
    }
    
  });
    this.servicemultas.getPrestamos().subscribe({
      next: (datos) => {
        this.prestamos = datos;
        this.prestamo=this.prestamos.find((p)=>(p.id===this.prestamoId))
        if (!this.prestamo) {
          console.log('Prestamo no encontrada:', this.prestamo);
        }
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al prestamos:', error);
      }
      
    });
}
 Volver(){
    this.router.navigate(['multas/index']);
  }
  putMultas(){
    if(this.multaeditada?.monto==undefined||this.multaeditada.monto<=0 )
   {
    return alert("Valores Invalidos")}

    this.http.put(this.url,this.multaeditada).subscribe(
      {
       next:()=>{
      this.multaeditada={
        monto:0,
        pagoRealizado:undefined
      }
      alert('Multa editada exitosamente');
      this.Volver();
    },
      error: (error) => {
          alert('Error al editar la multa'+error);
        }
      }
    );
  }
}
