
import { Component, inject, OnInit } from '@angular/core';
import { Susuarios } from '../../../services/susuarios';
import { HttpClient } from '@angular/common/http';
import { RolUsuario } from '../../../models/RolUsuario';
import { Usuario } from '../../../models/Usuario';
import { ActivatedRoute } from '@angular/router';
import { api_config } from '../../../core/api_config';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-useredit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  styleUrl: './useredit.css',
  templateUrl: './useredit.html',
})
export class Useredit implements OnInit {
  private service = inject(Susuarios);
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);

  private url = api_config.baseurl + '/api/Usuarios/PutUsuario';
  idusuario = 0;
  cargando = true;
  error = '';

  usuarioeditado: Usuario = {
    id: 0,
    nombre: '',
    email: '',
    passwordHash: '',
    rol: undefined,
    prestamos: []
  };

  usuarios: Usuario[] = [];

  roles: RolUsuario[] = [
    { id: 1, rol: 'Bibliotecario' },
    { id: 2, rol: 'Usuario' },
    { id: 3, rol: 'Encargado' }
  ];

  ngOnInit(): void {
    this.idusuario = Number(this.route.snapshot.paramMap.get('id'));

    if (!this.idusuario || Number.isNaN(this.idusuario)) {
      this.error = 'El identificador del usuario no es válido.';
      this.cargando = false;
      return;
    }

    this.service.GetUsuarios().subscribe({
      next: (datos) => {
        this.usuarios = datos;

        const usuario = this.usuarios.find(
          u => u.id === this.idusuario
        );

        if (!usuario) {
          this.error = 'No se encontró el usuario.';
          this.cargando = false;
          return;
        }

        this.usuarioeditado = {
          ...usuario,
          passwordHash: ''
        };

        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar el usuario:', error);
        this.error = 'No se pudo cargar el usuario.';
        this.cargando = false;
      }
    });
  }

  Volver(): void {
    this.service.Volver();
  }

  PutUsuario(): void {
    if (
      !this.usuarioeditado.nombre?.trim() ||
      !this.usuarioeditado.email?.trim() ||
      this.usuarioeditado.rol === undefined
    ) {
      alert('Ingrese el nombre, correo y rol.');
      return;
    }

    // No enviamos una contraseña vacía para no sobrescribirla.
    const usuarioActualizar = {
      id: this.usuarioeditado.id,
      nombre: this.usuarioeditado.nombre.trim(),
      email: this.usuarioeditado.email.trim(),
      rol: this.usuarioeditado.rol
    };

    this.http.put(this.url, usuarioActualizar).subscribe({
      next: () => {
        alert('Usuario editado correctamente.');
        this.Volver();
      },
      error: (error) => {
        console.error('Error al editar usuario:', error);
        alert('Error al editar usuario.');
      }
    });
  }
}
