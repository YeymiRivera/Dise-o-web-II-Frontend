import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ModuloCard } from '../../../models/modulo-card';

@Component({
  selector: 'app-modulo-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './modulo-card.html',
  styleUrl: './modulo-card.css'
})
export class ModuloCardComponent {
  @Input({ required: true }) modulo!: ModuloCard;
}