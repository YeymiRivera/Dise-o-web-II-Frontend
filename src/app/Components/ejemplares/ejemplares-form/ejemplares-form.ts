import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ESTADOS_EJEMPLAR, EstadoEjemplar } from '../../../models/Ejemplar';
import { LibroDto } from '../../../models/libro-dto';
import { Sejemplares } from '../../../services/sejemplares';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-ejemplares-form',
  styleUrl: './ejemplares-form.css',
  templateUrl: './ejemplares-form.html',
})
export class EjemplaresForm implements OnInit {
  private readonly service = inject(Sejemplares);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly estados = ESTADOS_EJEMPLAR;
  protected readonly libros = signal<LibroDto[]>([]);

  protected readonly id = signal<number | null>(null);
  protected readonly codigo = signal('');
  protected readonly estado = signal<EstadoEjemplar>(EstadoEjemplar.Disponible);
  protected readonly libroId = signal<number | null>(null);

  protected readonly guardando = signal(false);
  protected readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.service.getLibros().subscribe({
      next: (libros) => this.libros.set(libros),
      error: () => this.error.set('No se pudieron cargar los libros.'),
    });

    const idRuta = this.route.snapshot.paramMap.get('id');
    if (idRuta === null) return;

    this.id.set(Number(idRuta));
    this.service.getEjemplar(Number(idRuta)).subscribe({
      next: (ejemplar) => {
        this.codigo.set(ejemplar.codigo);
        this.estado.set(ejemplar.estado);
        this.libroId.set(ejemplar.libroId);
      },
      error: () => this.error.set('No se pudo cargar el ejemplar.'),
    });
  }

  protected guardar(): void {
    const codigo = this.codigo().trim();
    const libroId = this.libroId();

    if (!codigo || libroId === null) {
      this.error.set('El código y el libro son obligatorios.');
      return;
    }

    const datos = { codigo, estado: this.estado(), libroId };
    const id = this.id();
    const peticion$ =
      id === null ? this.service.createEjemplar(datos) : this.service.editEjemplar(id, datos);

    this.guardando.set(true);
    this.error.set(null);

    peticion$.subscribe({
      next: () => this.router.navigate(['/ejemplares']),
      error: (e: HttpErrorResponse) => {
        this.error.set(typeof e.error === 'string' && e.error ? e.error : 'No se pudo guardar el ejemplar.');
        this.guardando.set(false);
      },
    });
  }
}
