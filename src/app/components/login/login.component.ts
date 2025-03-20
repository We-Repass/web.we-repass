import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router) {}

  validateUserInput(event: any): void {
    event.target.value = event.target.value.replace(/\D/g, ''); // Elimina cualquier letra
  }
  Home() {
    console.log('Botón clickeado. Intentando redirigir a /login...');

    this.router.navigate(['/home']).catch(err => {
      console.error('Error en la redirección:', err);
    });
  }
}
