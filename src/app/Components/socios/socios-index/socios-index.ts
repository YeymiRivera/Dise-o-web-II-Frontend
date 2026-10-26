import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Socio } from '../../../models/Socio';
import { Ssocios } from '../../../services/ssocios';

@Component({
  imports: [RouterLink],
  selector: 'app-socios-index',
  templateUrl: './socios-index.html',
})
export class SociosIndex implements OnInit {
  private readonly service = inject(Ssocios);

  protected readonly socios = signal<Socio[]>([]);
  protected readonly cargando = signal(true);
  protected readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.cargar();
  }

  private cargar(): void {
    this.cargando.set(true);
    this.error.set(null);

    this.service.getSocios().subscribe({
      next: (datos) => {
        this.socios.set(datos);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No se pudo conectar con el servidor. Revisa que el backend esté activo.');
        this.cargando.set(false);
      },
    });
  }

  protected eliminar(socio: Socio): void {
    if (!confirm(`¿Eliminar al socio "${socio.nombre}"?`)) return;

    this.service.deleteSocio(socio.id).subscribe({
      next: () => this.cargar(),
      error: (e: HttpErrorResponse) => {
        const mensaje = typeof e.error === 'string' && e.error ? e.error : 'No se pudo eliminar el socio.';
        alert(mensaje);
      },
    });
  }
}