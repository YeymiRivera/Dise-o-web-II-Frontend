import { Component } from '@angular/core';
import { ModuloCard } from '../../models/modulo-card';
import { ModuloCardComponent } from '../shared/modulo-card/modulo-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ModuloCardComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  modulos: ModuloCard[] = [
    { titulo: 'Categorías', descripcion: 'Gestiona las categorías de libros', ruta: '/categorias' },
    { titulo: 'Libros', descripcion: 'Catálogo de libros registrados', ruta: '/libros' },
    { titulo: 'Ejemplares', descripcion: 'Copias físicas de cada libro', ruta: '/ejemplares' },
    { titulo: 'Socios', descripcion: 'Usuarios que solicitan préstamos', ruta: '/socios' },
    { titulo: 'Préstamos', descripcion: 'Registro de salidas y devoluciones', ruta: '/prestamos' },
    { titulo: 'Multas', descripcion: 'Penalizaciones por mora', ruta: '/multas' },
    { titulo: 'Reportes', descripcion: 'Estadísticas e informes del sistema', ruta: '/reportes' },
    { titulo: 'Usuarios', descripcion: 'Personal administrativo y bibliotecarios', ruta: '/usuarios' }
  ];
}