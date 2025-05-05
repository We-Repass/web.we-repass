import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { ExamenService } from '../../services/examen.service';

@Component({
  selector: 'app-examen',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit {
  semanas: { idsemana: number, estado: number, nota: number }[] = [];
  estado: number = 1;
  idusuario: number = 0;
  hayExamenesPendientes: boolean = false; // Variable para verificar si hay exámenes pendientes

  constructor(
    private router: Router,
    private backendservice: BackendService,
    private examenService: ExamenService
  ) {}

  ngOnInit() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const usuario = JSON.parse(userData)[0];
      this.idusuario = usuario.idusuario;
      this.estado = usuario.estado;
      this.semanas = usuario.semanas || [];

      this.semanas.sort((a, b) => a.idsemana - b.idsemana);

      // Comprobar si hay exámenes pendientes
      this.hayExamenesPendientes = this.semanas.some((semana) => semana.estado === 0);

      console.log("Hay exámenes pendientes:", this.hayExamenesPendientes);
    }
    this.nota();
  }

  nota() {
    this.backendservice.verNota(this.idusuario).subscribe(
      (response) => {
        // Mapear los "id" como "idsemana"
        this.semanas = response.map((item: any) => ({
          idsemana: item.id,
          nota: item.nota,
          estado: item.estado
        }));

        // Verificar nuevamente si hay exámenes pendientes
        this.hayExamenesPendientes = this.semanas.some((semana) => semana.estado === 0);
      },
      (error) => {
        console.error('Error al obtener la nota:', error);
      }
    );
  }

  entrar(idsemana: number) {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.backendservice.verExamen(idsemana).subscribe(
        (response) => {
          this.examenService.setExamen(response, idsemana);
          this.router.navigate(['/examen']).catch((err) => {
            console.error('Error en la redirección:', err);
          });
        },
        (error) => {
          console.error('Error al obtener el examen:', error);
        }
      );
    } else {
      console.log('Token no encontrado');
    }
  }
}
