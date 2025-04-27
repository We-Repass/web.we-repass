import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  
  constructor(
    private router: Router,
  ) {}

  Login() {
    console.log('Botón clickeado. Intentando redirigir a /login...');

    this.router.navigate(['/login']).catch(err => {
      console.error('Error en la redirección:', err);
    });
  }
}
