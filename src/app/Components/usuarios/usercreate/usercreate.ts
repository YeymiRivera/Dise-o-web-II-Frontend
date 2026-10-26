import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { api_config } from '../../../core/api_config';
import { Usuario } from '../../../models/Usuario';
import { RolUsuario } from '../../../models/RolUsuario';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Susuarios } from '../../../services/susuarios';
@Component({
  imports: [CommonModule,FormsModule],
  selector: 'app-usercreate',
  styleUrl: './usercreate.css',
  templateUrl: './usercreate.html',
})
export class Usercreate {
  constructor(private router:Router){}
  private http=inject(HttpClient);
  private service=inject(Susuarios)
  private url=api_config.baseurl+"/api/Usuarios/PostUsuario";
  roles:RolUsuario[]=this.service.roles;
  nuevousuario:Usuario={
    nombre:"",
    email:"",
    passwordHash:"",
    rol:undefined,
    prestamos:undefined,
  }
  PostUsuario(){
    if(this.nuevousuario.nombre==""||this.nuevousuario.email==""||this.nuevousuario.passwordHash==""
      ||this.nuevousuario.rol==undefined
    ){return alert("Ingrese todos los datos")}
    this.http.post(this.url,this.nuevousuario).subscribe({
      next:()=>{
        alert("Usuario Creado");
        this.nuevousuario={
    nombre:"",
    email:"",
    passwordHash:"",
    rol:undefined,
    prestamos:undefined,
  }},
  error:(error)=>{
    alert("Error al crear usuario");
    console.log("Error al crear usuario",error);
  }
    })
  }
Volver(){
    this.service.Volver()
  }
}
