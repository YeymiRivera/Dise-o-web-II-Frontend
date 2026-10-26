import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Categoria } from '../../../models/Categoria';
import { Scategorias } from '../../../services/scategorias';

@Component({
  imports: [RouterLink],
  selector: 'app-categorias-index',
  styleUrl: './categorias-index.css',
  templateUrl: './categorias-index.html',
})
export class CategoriasIndex implements OnInit {
  private readonly service = inject(Scategorias);

  protected readonly categorias = signal<Categoria[]>([]);
  protected readonly cargando = signal(true);
  protected readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.cargar();
  }

  private cargar(): void {
    this.cargando.set(true);
    this.error.set(null);

    this.service.getCategorias().subscribe({
      next: (datos) => {
        this.categorias.set(datos);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No se pudo conectar con el servidor. Revisa que el backend y el dev tunnel estén activos.');
        this.cargando.set(false);
      },
    });
  }

  protected eliminar(categoria: Categoria): void {
    if (!confirm(`¿Eliminar la categoría "${categoria.nombre}"?`)) return;

    this.service.deleteCategoria(categoria.id).subscribe({
      next: () => this.cargar(),
      error: (e: HttpErrorResponse) => {
        const mensaje = typeof e.error === 'string' && e.error ? e.error : 'No se pudo eliminar la categoría.';
        alert(mensaje);
      },
    });
  }
}
