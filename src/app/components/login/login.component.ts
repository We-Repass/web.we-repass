import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  validateUserInput(event: any): void {
    event.target.value = event.target.value.replace(/\D/g, ''); // Elimina cualquier letra
  }
  
}
