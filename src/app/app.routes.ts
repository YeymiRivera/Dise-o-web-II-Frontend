
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'multas',
    loadComponent: () =>
      import('./Components/multas/index/index').then(m => m.Index)
  },
  {
    path: 'prestamos',
    loadComponent: () =>
      import('./Components/prestamos/prestamos').then(m => m.Prestamos)
  },
  {
    path: 'reportes',
    loadComponent: () =>
      import('./Components/reportes/reportes').then(m => m.Reportes)
  },
  {
    path: '',
    redirectTo: 'prestamos',
    pathMatch: 'full'
  }
];
