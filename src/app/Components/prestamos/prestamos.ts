
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Prestamo {
  id: number;
  usuario: string;
  libro: string;
  fechaPrestamo: string;
  fechaDevolucion: string;
  estado: 'Activo' | 'Devuelto' | 'Vencido';
}

@Component({
  selector: 'app-prestamos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './prestamos.html',
  styleUrl: './prestamos.css'
})
export class Prestamos {
  busqueda = '';
  mostrarFormulario = false;
  mensaje = '';

  nuevo = {
    usuario: '',
    libro: '',
    fechaPrestamo: this.fechaHoy(),
    fechaDevolucion: ''
  };

  prestamos: Prestamo[] = [
    {
      id: 1,
      usuario: 'María López',
      libro: 'Cien años de soledad',
      fechaPrestamo: '2026-10-20',
      fechaDevolucion: '2026-10-27',
      estado: 'Activo'
    },
    {
      id: 2,
      usuario: 'Carlos Pérez',
      libro: 'El principito',
      fechaPrestamo: '2026-10-10',
      fechaDevolucion: '2026-10-17',
      estado: 'Vencido'
    },
    {
      id: 3,
      usuario: 'Ana Flores',
      libro: 'Don Quijote de la Mancha',
      fechaPrestamo: '2026-10-15',
      fechaDevolucion: '2026-10-22',
      estado: 'Devuelto'
    }
  ];

  fechaHoy(): string {
    const fecha = new Date();
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');

    return `${anio}-${mes}-${dia}`;
  }

  prestamosFiltrados(): Prestamo[] {
    const texto = this.busqueda.toLowerCase().trim();

    return this.prestamos.filter(p =>
      `${p.id} ${p.usuario} ${p.libro} ${p.estado}`
        .toLowerCase()
        .includes(texto)
    );
  }

  contarActivos(): number {
    return this.prestamos.filter(p => p.estado === 'Activo').length;
  }

  contarVencidos(): number {
    return this.prestamos.filter(p => p.estado === 'Vencido').length;
  }

  nuevoPrestamo(): void {
    this.mensaje = '';
    this.nuevo = {
      usuario: '',
      libro: '',
      fechaPrestamo: this.fechaHoy(),
      fechaDevolucion: ''
    };
    this.mostrarFormulario = true;
  }

  cancelarPrestamo(): void {
    this.mostrarFormulario = false;
    this.mensaje = '';
  }

  guardarPrestamo(): void {
    const usuario = this.nuevo.usuario.trim();
    const libro = this.nuevo.libro.trim();

    if (!usuario || !libro ||
        !this.nuevo.fechaPrestamo ||
        !this.nuevo.fechaDevolucion) {
      this.mensaje = 'Completa todos los campos obligatorios.';
      return;
    }

    if (this.nuevo.fechaDevolucion < this.nuevo.fechaPrestamo) {
      this.mensaje =
        'La fecha de devolución no puede ser anterior al préstamo.';
      return;
    }

    const prestamo: Prestamo = {
      id: Math.max(0, ...this.prestamos.map(p => p.id)) + 1,
      usuario,
      libro,
      fechaPrestamo: this.nuevo.fechaPrestamo,
      fechaDevolucion: this.nuevo.fechaDevolucion,
      estado: 'Activo'
    };

    this.prestamos = [prestamo, ...this.prestamos];
    this.busqueda = '';
    this.mostrarFormulario = false;
    this.mensaje = '';
  }
}
