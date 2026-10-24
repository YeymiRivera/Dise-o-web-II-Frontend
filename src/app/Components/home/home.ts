import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Recomendado para iterar y manejar estados en la plantilla
import { ModuloCard } from '../../models/modulo-card';
import { ModuloCardComponent } from '../shared/modulo-card/modulo-card';
import { ApiService } from '../../services/api.service'; // Inyectamos el servicio de las APIs

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ModuloCardComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  // Mantienes tus tarjetas para la navegación de la aplicación
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

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Aquí puedes hacer llamadas de prueba al backend si lo necesitas
    // Por ejemplo: probar si responde el endpoint de reportes o resumen
    /*
    this.apiService.getData('reportes').subscribe({
      next: (res) => console.log('Conexión exitosa con el backend:', res),
      error: (err) => console.log('El backend aún no responde, usando interfaz local.', err)
    });
    */
  }
}