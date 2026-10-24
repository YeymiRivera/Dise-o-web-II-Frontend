import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Smultas } from '../../../services/smultas';
import { Multa } from '../../../models/multa';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Prestamo } from '../../../models/Prestamo';
@Component({
  imports: [FormsModule],
  selector: 'app-editar',
  styleUrl: './editar.css',
  templateUrl: './editar.html',
})
export class Editar {
constructor(private route: ActivatedRoute,private router: Router) {};
private servicemultas=inject(Smultas);
private cdr=inject(ChangeDetectorRef);
prestamoId=0;
multas:Multa[]=[];
multaeditada?:Multa;
prestamos:Prestamo[]=[];
prestamo?:Multa;
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
      this.prestamo=this.multas.find((p)=>(p.id===this.prestamoId))
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
}
