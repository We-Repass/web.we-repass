import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { BackendService } from '../../services/backend.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-examen',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule],
  templateUrl: './crear-examen.component.html',
  styleUrl: './crear-examen.component.css'
})
export class CrearExamenComponent {
  semanas: any[] = [];
  selectedSemana: number | null = null;
  temas: string[] = ['Matemáticas', 'Ciencias', 'Historia'];
  dificultades: string[] = ['Facil', 'Medio', 'Dificil'];

  preguntas: any[] = Array.from({ length: 10 }, () => ({
    tema: '',
    dificultad: '',
    pregunta: '',
    opciones: [''],
    respuesta: '',
  }));

  constructor(private backendService: BackendService) {}

  ngOnInit() {
    this.verSemana();
  }

  verSemana() {
    this.backendService.verSemana().subscribe(
      (data) => {
        this.semanas = data;
      },
      (error) => {
        console.error('Error al obtener semanas:', error);
      }
    );
  }

  agregarOpcion(index: number) {
    this.preguntas[index].opciones.push('');
  }

  eliminarOpcion(pIndex: number, oIndex: number) {
    this.preguntas[pIndex].opciones.splice(oIndex, 1);
  }

  guardarPreguntas() {
    const examen = this.preguntas.map(p => ({
      idsemana: this.selectedSemana,
      tema: p.tema,
      dificultad: p.dificultad,
      preguntas: p.pregunta,
      opciones: p.opciones,
      respuesta: p.respuesta
    }));
  
    this.backendService.guardarExamen(examen).subscribe(
      (response) => {
        console.log('Examen guardado con éxito:', response);  // Aquí se espera el formato adecuado
      },
      (error) => {
        console.error('Error al guardar examen:', error);
      }
    );
  }
  
  
  
}
