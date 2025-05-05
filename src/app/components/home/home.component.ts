import { Component, OnInit  } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  nombre: string = '';
  estado: number = 0;

  constructor(
    private router: Router,
  ) {}

  ngOnInit() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const usuario = JSON.parse(userData)[0]; 
      this.nombre = usuario.nombres;
  
      const semanaPendiente = Array.isArray(usuario.semanas) ? 
      usuario.semanas.find((semana: { estado: number }) => semana.estado === 0) 
      : null;
   
      if (semanaPendiente) {
        this.estado = 0;  
      } else {
        this.estado = 1;  
      }
  
      console.log("Estado actual:", this.estado);  
    }
  }
  

  IA(){
    console.log('Botón clickeado. Intentando redirigir a /login...');
    this.router.navigate(['/practica-ia']).catch(err => {
      console.error('Error en la redirección:', err);
    });
  }
  entrar(){
    this.router.navigate(['/examenes']).catch(err => {
      console.error('Error en la redirección:', err);
    });
  }
}