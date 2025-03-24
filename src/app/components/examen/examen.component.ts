import { Component, OnInit  } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-examen',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './examen.component.html',
  styleUrl: './examen.component.css'
})
export class ExamenComponent implements OnInit{
  semanas: string[] = [];
  nota = 10;
  estado: number = 1;
  constructor(private router: Router) {}

  ngOnInit() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const usuario = JSON.parse(userData)[0]; 
      this.estado = usuario.estado;
    }
    this.generarSemanas();
  }
  
  generarSemanas() {
    const semanaActual = this.obtenerNumeroSemana();
    this.semanas = [];
    for (let i = 1; i <= semanaActual; i++) {
      this.semanas.push(`Semana ${i}`);
    }
  }
  
  obtenerNumeroSemana(): number {
    const fecha = new Date();
    const primerDiaAño = new Date(fecha.getFullYear(), 0, 1);
    const diaSemana = primerDiaAño.getDay();
    const diasPasados = Math.floor((fecha.getTime() - primerDiaAño.getTime()) / (24 * 60 * 60 * 1000));
  
    return Math.ceil((diasPasados + diaSemana) / 7);
  }

  entrar(){
    this.router.navigate(['/examen']).catch(err => {
      console.error('Error en la redirección:', err);
    });
  }
}
