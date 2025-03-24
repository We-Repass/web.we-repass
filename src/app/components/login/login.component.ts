import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private backendService: BackendService
  ) {
    this.loginForm = this.formBuilder.group({
      dni: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      contrasenia: ['', [Validators.required]]
    });
  }

  showPassword: boolean = false; 
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  validateUserInput(event: any): void {
    event.target.value = event.target.value.replace(/\D/g, ''); // Permitir solo números
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { dni, contrasenia } = this.loginForm.value;
      this.backendService.login(dni, contrasenia).subscribe(
        (response) => {
          console.log('Respuesta del backend:', response);
          console.log('Tipo de response:', typeof response); // Verificar tipo de response

          const responseStr = String(response); // Asegurar que sea una cadena

          if (responseStr === '0') {
            this.errorMessage = 'Usuario no existe';
            return;
          } else if (responseStr === '2') {
            this.errorMessage = 'Contraseña incorrecta';
            return;
          }

          // Si la respuesta es válida, guardar usuario y redirigir
          localStorage.setItem('userData', JSON.stringify(response));
          console.log('Redirigiendo a home...');
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Error en la autenticación:', error);
          this.errorMessage = 'Error en la autenticación';
        }
      );
    }
  }

  Home(): void {
    console.log('Botón clickeado. Intentando redirigir a /home...');
    this.router.navigate(['/home']).catch(err => {
      console.error('Error en la redirección:', err);
    });
  }
}
