import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Index } from './Components/multas/index';
import { Create } from './Components/multas/create/create';

@Component({
  imports: [RouterOutlet, Index,Create],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Proyecto-Diseno-Web-2');
}
