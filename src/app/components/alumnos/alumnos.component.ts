import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.css'
})
export class AlumnosComponent implements OnInit {

  alumnos: any[] = [];

  constructor(private backendService: BackendService) {}

  ngOnInit(): void {
    this.obtenerAlumnos();
  }

  obtenerAlumnos(): void {
    this.backendService.listarUsuarios().subscribe(
      (data) => {
        this.alumnos = data;
      },
      (error) => {
        console.error('Error al obtener los alumnos', error);
      }
    );
  }

  obtenerNota(alumno: any, semana: number): any {
    const nota = alumno.notas?.find((nota: any) => nota.idsemana === semana);
    return nota ? nota.nota : '-';
  }
}
