import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { HttpHeaders } from '@angular/common/http';
import { ExamenService } from '../../services/examen.service';
import { response } from 'express';
import { error } from 'console';
@Component({
  selector: 'app-examen',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit {
  semanas: { idsemana: number, estado: number, nota:number }[] = [];
  estado: number = 1;
  idusuario : number = 0;

  constructor(
    private router: Router,
    private backendservice: BackendService,
    private examenService: ExamenService
  ) {}

  ngOnInit() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const usuario = JSON.parse(userData)[0];

      this.idusuario = usuario.idusuario

      this.estado = usuario.estado;

      this.semanas = usuario.semanas || [];

      this.semanas.sort((a, b) => a.idsemana - b.idsemana);
    }
    this.nota();
  }

  nota(){
    this.backendservice.verNota(this.idusuario).subscribe(
      (response) => {
        console.log(response)
      },
      (error) => {
        console.error('Error al obtener el nota:', error);
      }
    )
  }

  entrar(idsemana: number) {
    const token = localStorage.getItem('authToken');
    
    this.backendservice.verExamen(idsemana).subscribe(
      (response) => {
        this.examenService.setExamen(response, idsemana);
        
        this.router.navigate(['/examen']).catch(err => {
          console.error('Error en la redirección:', err);
        });
      },
      (error) => {
        console.error('Error al obtener el examen:', error);
      }
    );
  }
  
  
  
}
