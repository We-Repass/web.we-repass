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
  estado: number = 1;

  constructor(
    private router: Router,
  ) {}

  ngOnInit() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const usuario = JSON.parse(userData)[0]; 
      this.nombre = usuario.nombres; 
      this.estado = usuario.estado !== null ? usuario.estado : 1;
    }
  }

  IA(){
    console.log('Botón clickeado. Intentando redirigir a /login...');
    this.router.navigate(['/practica-ia']).catch(err => {
      console.error('Error en la redirección:', err);
    });
  }
  entrar(){
    this.router.navigate(['/examen']).catch(err => {
      console.error('Error en la redirección:', err);
    });
  }
}