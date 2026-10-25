
import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home';
import { Create } from './Components/multas/create/create';
import { Index } from './Components/multas/index';
import { Editar } from './Components/multas/editar/editar';
import { Userindex } from './Components/usuarios/userindex/userindex';
import { Usercreate } from './Components/usuarios/usercreate/usercreate';
import { Useredit } from './Components/usuarios/useredit/useredit';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'multas/index', component: Index },
  { path: 'multas/create', component: Create },
  { path: 'multas/editar/:id', component: Editar },
  { path: 'usuarios/userindex', component: Userindex },
  {path: 'usuarios/usercreate', component:Usercreate},
  {path:'usuarios/useredit/:id', component:Useredit}, {
    path: 'prestamos',
    loadComponent: () =>
      import('./Components/prestamos/prestamos').then(m => m.Prestamos)
  },
  {
    path: 'reportes',
    loadComponent: () =>
      import('./Components/reportes/reportes').then(m => m.Reportes)
  },
  { path: '**', redirectTo: '' }
];
