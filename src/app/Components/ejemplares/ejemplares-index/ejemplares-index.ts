import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ESTADOS_EJEMPLAR, Ejemplar, EstadoEjemplar } from '../../../models/Ejemplar';
import { Sejemplares } from '../../../services/sejemplares';

@Component({
  imports: [RouterLink],
  selector: 'app-ejemplares-index',
  styleUrl: './ejemplares-index.css',
  templateUrl: './ejemplares-index.html',
})
export class EjemplaresIndex implements OnInit {
  private readonly service = inject(Sejemplares);

  protected readonly ejemplares = signal<Ejemplar[]>([]);
  protected readonly cargando = signal(true);
  protected readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.cargar();
  }

  private cargar(): void {
    this.cargando.set(true);
    this.error.set(null);

    this.service.getEjemplares().subscribe({
      next: (datos) => {
        this.ejemplares.set(datos);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No se pudo conectar con el servidor. Revisa que el backend y el dev tunnel estén activos.');
        this.cargando.set(false);
      },
    });
  }

  protected nombreEstado(estado: EstadoEjemplar): string {
    return ESTADOS_EJEMPLAR.find((e) => e.valor === estado)?.nombre ?? 'Desconocido';
  }

  protected claseEstado(estado: EstadoEjemplar): string {
    switch (estado) {
      case EstadoEjemplar.Disponible:
        return 'text-bg-success';
      case EstadoEjemplar.Prestado:
        return 'text-bg-warning';
      default:
        return 'text-bg-danger';
    }
  }

  protected eliminar(ejemplar: Ejemplar): void {
    if (!confirm(`¿Eliminar el ejemplar "${ejemplar.codigo}"?`)) return;

    this.service.deleteEjemplar(ejemplar.id).subscribe({
      next: () => this.cargar(),
      error: (e: HttpErrorResponse) => {
        const mensaje = typeof e.error === 'string' && e.error ? e.error : 'No se pudo eliminar el ejemplar.';
        alert(mensaje);
      },
    });
  }
}
