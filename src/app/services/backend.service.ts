import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from '../../enviroments/enviroment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private options: any = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  apiUrl = environment.apiUrl;

  constructor(
    public http: HttpClient,
    private router: Router
  ) { }

  login(dni: number, contrasenia: string): Observable<any> {
    const usuario = { dni, contrasenia };
    return this.http.post(`${this.apiUrl}/usuario/login`, usuario);
  }
  
    logout(): void {
    localStorage.removeItem('userData'); 
    this.router.navigate(['/login']); 
  }

  verSemana(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/ver/semana`);
  }

  guardarExamen(examen: any[]): Observable<string> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<string>(`${this.apiUrl}/crear/examen`, examen, { headers });
  }
}

