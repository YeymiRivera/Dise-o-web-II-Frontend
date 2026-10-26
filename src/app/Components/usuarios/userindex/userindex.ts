import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { api_config } from '../../../core/api_config';
import { Usuario } from '../../../models/Usuario';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  imports: [],
  selector: 'app-userindex',
  styleUrl: './userindex.css',
  templateUrl: './userindex.html',
})
export class Userindex {
  constructor(private router:Router){}
  private http=inject(HttpClient);
  private url=api_config.baseurl+"/api/Usuarios/GetUsuarios";
  private cdr=inject(ChangeDetectorRef);
  users:Usuario[]=[];
  ngOnInit():void{
    this.GetUsuarios().subscribe({
      next:(datos)=>{
        this.users=datos
        this.cdr.detectChanges();
      },
      error:(error)=>{
        console.log("error al cargar usuarios",error)
      }
    })
  }
   GetUsuarios():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.url);
  }
  CrearUsuario(){
    this.router.navigate(['/usuarios/usercreate']);
  }
  Editar(id:number|undefined){
    this.router.navigate(['/usuarios/useredit',id]);
  }
}
