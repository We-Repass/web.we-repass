import { Component, OnInit  } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  perfilUsuario: number = 0;
  constructor(private router: Router) {}

  ngOnInit() {
    const userData = localStorage.getItem('userData');
    if (userData) {
        const usuario = JSON.parse(userData)[0]; 
        console.log("Usuario:", usuario);

        if (usuario && usuario.perfil) {
            this.perfilUsuario = Number(usuario.perfil); 
            console.log("Perfil:", this.perfilUsuario);
        }
    }
}
  cerrarSesion(): void {
    localStorage.removeItem('userData'); 
    this.router.navigate(['/login']); 
  }

  Home(){
    this.router.navigate(['/home']).catch(err => {
      console.error('Error en la redirección:', err);
    });
  }

  Examenes(){
    this.router.navigate(['/examenes']).catch(err => {
      console.error('Error en la redirección:', err);
    });
  }

  IA(){
    this.router.navigate(['/practica-ia']).catch(err => {
      console.error('Error en la redirección:', err);
    });
  }

  Alumnos(){
    this.router.navigate(['/alumnos']).catch(err => {
      console.error('Error en la redirección:', err);
    });
  }

  crearExamen(){
    this.router.navigate(['/crear-examen']).catch(err => {
      console.error('Error en la redirección:', err);
    });
  }
}
