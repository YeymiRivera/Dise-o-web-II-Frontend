import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home';
import { Create } from './Components/multas/create/create';
import { Index } from './Components/multas/index';
import { Editar } from './Components/multas/editar/editar';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'multas/index', component: Index },
  { path: 'multas/create', component: Create },
  { path: 'multas/editar/:id', component: Editar },
  { path: '**', redirectTo: '' }
];