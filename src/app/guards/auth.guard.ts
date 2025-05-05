import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Verificar si el código se está ejecutando en el navegador
    if (typeof window !== 'undefined' && window.localStorage) {
      const userData = localStorage.getItem('userData');
      if (userData) {
        return true; // Permitir acceso si hay sesión activa
      } else {
        this.router.navigate(['/login']); // Redirigir si no hay sesión
        return false;
      }
    } else {
      // Si estamos en un entorno donde localStorage no está disponible, bloquear el acceso
      this.router.navigate(['/login']);
      return false;
    }
  }
}
