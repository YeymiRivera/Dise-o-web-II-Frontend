
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface ReporteMensual {
  mes: string;
  cantidad: number;
}

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reportes.html',
  styleUrl: './reportes.css'
})
export class Reportes implements AfterViewInit, OnDestroy {
  @ViewChild('graficoMensual')
  graficoMensualRef!: ElementRef<HTMLCanvasElement>;

  @ViewChild('graficoEstados')
  graficoEstadosRef!: ElementRef<HTMLCanvasElement>;

  fechaInicio = '';
  fechaFin = '';
  estadoSeleccionado = 'todos';

  // Datos de ejemplo. Más adelante se reemplazarán por datos de la API.
  reportesMensuales: ReporteMensual[] = [
    { mes: 'Ene', cantidad: 18 },
    { mes: 'Feb', cantidad: 25 },
    { mes: 'Mar', cantidad: 21 },
    { mes: 'Abr', cantidad: 32 },
    { mes: 'May', cantidad: 27 },
    { mes: 'Jun', cantidad: 38 },
    { mes: 'Jul', cantidad: 30 },
    { mes: 'Ago', cantidad: 35 },
    { mes: 'Sep', cantidad: 28 },
    { mes: 'Oct', cantidad: 42 },
    { mes: 'Nov', cantidad: 34 },
    { mes: 'Dic', cantidad: 45 }
  ];

  prestamos = [
    { id: 1, libro: 'Cien años de soledad', usuario: 'Ana Pérez', fecha: '2026-01-10', estado: 'Devuelto' },
    { id: 2, libro: 'Don Quijote de la Mancha', usuario: 'Carlos Rojas', fecha: '2026-02-15', estado: 'Pendiente' },
    { id: 3, libro: 'El principito', usuario: 'María López', fecha: '2026-03-05', estado: 'Atrasado' },
    { id: 4, libro: 'La ciudad y los perros', usuario: 'Luis Flores', fecha: '2026-04-12', estado: 'Devuelto' },
    { id: 5, libro: 'Rayuela', usuario: 'Sofía Vargas', fecha: '2026-05-20', estado: 'Pendiente' },
    { id: 6, libro: 'Pedro Páramo', usuario: 'Diego Morales', fecha: '2026-06-08', estado: 'Devuelto' },
    { id: 7, libro: 'El túnel', usuario: 'Lucía Méndez', fecha: '2026-07-11', estado: 'Atrasado' },
    { id: 8, libro: 'Ficciones', usuario: 'Jorge Salas', fecha: '2026-08-03', estado: 'Devuelto' }
  ];

  graficoMensual?: Chart;
  graficoEstados?: Chart;

  ngAfterViewInit(): void {
    this.crearGraficoMensual();
    this.crearGraficoEstados();
  }

  get prestamosFiltrados() {
    return this.prestamos.filter(prestamo => {
      const cumpleEstado =
        this.estadoSeleccionado === 'todos' ||
        prestamo.estado.toLowerCase() === this.estadoSeleccionado.toLowerCase();

      const cumpleInicio =
        !this.fechaInicio || prestamo.fecha >= this.fechaInicio;

      const cumpleFin =
        !this.fechaFin || prestamo.fecha <= this.fechaFin;

      return cumpleEstado && cumpleInicio && cumpleFin;
    });
  }

  get totalPrestamos(): number {
    return this.prestamosFiltrados.length;
  }

  get totalDevueltos(): number {
    return this.prestamosFiltrados.filter(p => p.estado === 'Devuelto').length;
  }

  get totalPendientes(): number {
    return this.prestamosFiltrados.filter(p => p.estado === 'Pendiente').length;
  }

  get totalAtrasados(): number {
    return this.prestamosFiltrados.filter(p => p.estado === 'Atrasado').length;
  }

  crearGraficoMensual(): void {
    this.graficoMensual = new Chart(this.graficoMensualRef.nativeElement, {
      type: 'bar',
      data: {
        labels: this.reportesMensuales.map(r => r.mes),
        datasets: [{
          label: 'Préstamos',
          data: this.reportesMensuales.map(r => r.cantidad),
          backgroundColor: '#3b82f6',
          borderRadius: 6,
          maxBarThickness: 32
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { precision: 0 }
          }
        }
      }
    });
  }

  crearGraficoEstados(): void {
    this.graficoEstados = new Chart(this.graficoEstadosRef.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Devueltos', 'Pendientes', 'Atrasados'],
        datasets: [{
          data: [
            this.prestamos.filter(p => p.estado === 'Devuelto').length,
            this.prestamos.filter(p => p.estado === 'Pendiente').length,
            this.prestamos.filter(p => p.estado === 'Atrasado').length
          ],
          backgroundColor: ['#16a34a', '#f59e0b', '#ef4444'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '68%',
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }

  limpiarFiltros(): void {
    this.fechaInicio = '';
    this.fechaFin = '';
    this.estadoSeleccionado = 'todos';
  }

  exportarCSV(): void {
    const encabezado = ['ID', 'Libro', 'Usuario', 'Fecha', 'Estado'];

    const filas = this.prestamosFiltrados.map(p => [
      p.id,
      p.libro,
      p.usuario,
      p.fecha,
      p.estado
    ]);

    const contenido = [encabezado, ...filas]
      .map(fila =>
        fila.map(valor =>
          `"${String(valor).replace(/"/g, '""')}"`
        ).join(';')
      )
      .join('\r\n');

    // BOM para facilitar la lectura de caracteres especiales en Excel.
    const blob = new Blob(['\uFEFF' + contenido], {
      type: 'text/csv;charset=utf-8;'
    });

    const url = URL.createObjectURL(blob);
    const enlace = document.createElement('a');

    enlace.href = url;
    enlace.download = 'reporte-prestamos.csv';
    enlace.click();

    URL.revokeObjectURL(url);
  }

  imprimirReporte(): void {
    window.print();
  }

  ngOnDestroy(): void {
    this.graficoMensual?.destroy();
    this.graficoEstados?.destroy();
  }
}
