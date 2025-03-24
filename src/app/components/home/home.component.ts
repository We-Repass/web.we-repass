import { Component, OnInit  } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  nombre: string = '';
  constructor(
    private router: Router,
  ) {}

  ngOnInit() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const usuario = JSON.parse(userData)[0]; 
      this.nombre = usuario.nombres; 
    }
  }

  IA(){
    console.log('Botón clickeado. Intentando redirigir a /login...');
    this.router.navigate(['/practica-ia']).catch(err => {
      console.error('Error en la redirección:', err);
    });
  }
}