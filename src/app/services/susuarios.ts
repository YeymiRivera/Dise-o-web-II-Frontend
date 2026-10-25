import { inject, Service } from '@angular/core';
import { Router } from '@angular/router';
import { RolUsuario } from '../models/RolUsuario';
import { Observable } from 'rxjs';
import { Usuario } from '../models/Usuario';
import { HttpClient } from '@angular/common/http';
import { api_config } from '../core/api_config';

@Service()
export class Susuarios {
    
    private http=inject(HttpClient);
    private url=api_config.baseurl+"/api/Usuarios/GetUsuarios";
   private router=inject(Router);
    GetUsuarios():Observable<Usuario[]>{
        return this.http.get<Usuario[]>(this.url);
      }
    Volver(){
    this.router.navigate(['usuarios/userindex']);
  }
   roles:RolUsuario[]=[ 
      {
        id:1,
        rol:"Bibliotecario"
      },
      {
        id:2, rol:"Operador de Atencion"
      },
      { id:3, rol:"Usuario"}
    ];
}
