import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LibroDto } from '../../../models/libro-dto';
import { Slibros } from '../../../services/slibros';

@Component({
  imports: [RouterLink],
  selector: 'app-libros-index',
  templateUrl: './libros-index.html',
})
export class LibrosIndex implements OnInit {
  private readonly service = inject(Slibros);

  protected readonly libros = signal<LibroDto[]>([]);
  protected readonly cargando = signal(true);
  protected readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.cargar();
  }

  private cargar(): void {
    this.cargando.set(true);
    this.error.set(null);

    this.service.getLibros().subscribe({
      next: (datos) => {
        this.libros.set(datos);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No se pudo conectar con el servidor. Revisa que el backend esté activo.');
        this.cargando.set(false);
      },
    });
  }

  protected eliminar(libro: LibroDto): void {
    if (!confirm(`¿Eliminar el libro "${libro.titulo}"?`)) return;

    this.service.deleteLibro(libro.id).subscribe({
      next: () => this.cargar(),
      error: (e: HttpErrorResponse) => {
        const mensaje = typeof e.error === 'string' && e.error ? e.error : 'No se pudo eliminar el libro.';
        alert(mensaje);
      },
    });
  }
}