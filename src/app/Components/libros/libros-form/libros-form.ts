import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Categoria } from '../../../models/Categoria';
import { Scategorias } from '../../../services/scategorias';
import { Slibros } from '../../../services/slibros';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-libros-form',
  templateUrl: './libros-form.html',
})
export class LibrosForm implements OnInit {
  private readonly service = inject(Slibros);
  private readonly categoriasService = inject(Scategorias);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly id = signal<number | null>(null);
  protected readonly titulo = signal('');
  protected readonly autor = signal('');
  protected readonly isbn = signal('');
  protected readonly categoriaId = signal(0);
  protected readonly categorias = signal<Categoria[]>([]);
  protected readonly guardando = signal(false);
  protected readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.categoriasService.getCategorias().subscribe({
      next: (datos) => this.categorias.set(datos),
      error: () => this.error.set('No se pudieron cargar las categorías.'),
    });

    const idRuta = this.route.snapshot.paramMap.get('id');
    if (idRuta === null) return;

    this.id.set(Number(idRuta));
    this.service.getLibro(Number(idRuta)).subscribe({
      next: (libro) => {
        this.titulo.set(libro.titulo);
        this.autor.set(libro.autor);
        this.isbn.set(libro.isbn ?? '');
        this.categoriaId.set(libro.categoriaId);
      },
      error: () => this.error.set('No se pudo cargar el libro.'),
    });
  }

  protected guardar(): void {
    const titulo = this.titulo().trim();
    const autor = this.autor().trim();
    const isbn = this.isbn().trim();

    if (!titulo || !autor) {
      this.error.set('El título y el autor son obligatorios.');
      return;
    }
    if (this.categoriaId() <= 0) {
      this.error.set('Selecciona una categoría.');
      return;
    }

    const datos = { titulo, autor, isbn: isbn || null, categoriaId: this.categoriaId() };
    const id = this.id();
    const peticion$ =
      id === null ? this.service.createLibro(datos) : this.service.editLibro(id, datos);

    this.guardando.set(true);
    this.error.set(null);

    peticion$.subscribe({
      next: () => this.router.navigate(['/libros']),
      error: (e: HttpErrorResponse) => {
        this.error.set(typeof e.error === 'string' && e.error ? e.error : 'No se pudo guardar el libro.');
        this.guardando.set(false);
      },
    });
  }
}