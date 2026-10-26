import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Ssocios } from '../../../services/ssocios';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-socios-form',
  templateUrl: './socios-form.html',
})
export class SociosForm implements OnInit {
  private readonly service = inject(Ssocios);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly id = signal<number | null>(null);
  protected readonly nombre = signal('');
  protected readonly ci = signal('');
  protected readonly email = signal('');
  protected readonly telefono = signal('');
  protected readonly guardando = signal(false);
  protected readonly error = signal<string | null>(null);

  ngOnInit(): void {
    const idRuta = this.route.snapshot.paramMap.get('id');
    if (idRuta === null) return;

    this.id.set(Number(idRuta));
    this.service.getSocio(Number(idRuta)).subscribe({
      next: (socio) => {
        this.nombre.set(socio.nombre);
        this.ci.set(socio.ci);
        this.email.set(socio.email ?? '');
        this.telefono.set(socio.telefono ?? '');
      },
      error: () => this.error.set('No se pudo cargar el socio.'),
    });
  }

  protected guardar(): void {
    const nombre = this.nombre().trim();
    const ci = this.ci().trim();
    const email = this.email().trim();
    const telefono = this.telefono().trim();

    if (!nombre || !ci) {
      this.error.set('El nombre y el CI son obligatorios.');
      return;
    }

    const datos = { nombre, ci, email: email || null, telefono: telefono || null };
    const id = this.id();
    const peticion$ =
      id === null ? this.service.createSocio(datos) : this.service.editSocio(id, datos);

    this.guardando.set(true);
    this.error.set(null);

    peticion$.subscribe({
      next: () => this.router.navigate(['/socios']),
      error: (e: HttpErrorResponse) => {
        this.error.set(typeof e.error === 'string' && e.error ? e.error : 'No se pudo guardar el socio.');
        this.guardando.set(false);
      },
    });
  }
}