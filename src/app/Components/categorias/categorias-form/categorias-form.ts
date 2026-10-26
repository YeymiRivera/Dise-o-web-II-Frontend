import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Scategorias } from '../../../services/scategorias';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-categorias-form',
  styleUrl: './categorias-form.css',
  templateUrl: './categorias-form.html',
})
export class CategoriasForm implements OnInit {
  private readonly service = inject(Scategorias);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly id = signal<number | null>(null);
  protected readonly nombre = signal('');
  protected readonly guardando = signal(false);
  protected readonly error = signal<string | null>(null);

  ngOnInit(): void {
    const idRuta = this.route.snapshot.paramMap.get('id');
    if (idRuta === null) return;

    this.id.set(Number(idRuta));
    this.service.getCategoria(Number(idRuta)).subscribe({
      next: (categoria) => this.nombre.set(categoria.nombre),
      error: () => this.error.set('No se pudo cargar la categoría.'),
    });
  }

  protected guardar(): void {
    const nombre = this.nombre().trim();
    if (!nombre) {
      this.error.set('El nombre es obligatorio.');
      return;
    }

    const id = this.id();
    const peticion$ =
      id === null
        ? this.service.createCategoria({ nombre })
        : this.service.editCategoria(id, { nombre });

    this.guardando.set(true);
    this.error.set(null);

    peticion$.subscribe({
      next: () => this.router.navigate(['/categorias']),
      error: (e: HttpErrorResponse) => {
        this.error.set(typeof e.error === 'string' && e.error ? e.error : 'No se pudo guardar la categoría.');
        this.guardando.set(false);
      },
    });
  }
}
