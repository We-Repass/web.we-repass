import { Component, OnInit,OnDestroy  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamenService } from '../../services/examen.service';
import { CommonModule } from '@angular/common';
import { SecondsToTimePipeModule } from '../pipes/seconds-to-time.pipe.module';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-ver-examen',
  standalone: true,
  imports: [CommonModule, SecondsToTimePipeModule],
  templateUrl: './ver-examen.component.html',
  styleUrl: './ver-examen.component.css'
})
export class VerExamenComponent  implements OnInit,OnDestroy  {
  examen: any;
  preguntas: any[] = [];
  respuestas: { [key: number]: string } = {};
  idUsuario: number | null = null;
  tiempoRestante: number = 600;
  timer: any;
  mostrarModal: boolean = false;
  estado: number = 0; 
  mostrarModalCompleto: boolean = false;

  constructor(
    private examenService: ExamenService,
    private router: Router,
    private backendService: BackendService
  ) {}


  ngOnInit() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const usuario = JSON.parse(userData)[0];
      this.idUsuario = usuario.idusuario;
    }

    this.examen = this.examenService.getExamen();
    console.log(this.examen)

    if (this.examen) {
      this.preguntas = this.examen.map((pregunta: any) => {
        return {
          ...pregunta,
          opciones: JSON.parse(pregunta.opciones)
        };
      });
      this.preguntas = this.shuffleArray(this.preguntas);
    }
    this.iniciarTemporizador();
  }

  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array;
  }

  mostrarExamen() {
    if (this.examen) {
    } else {
      console.log('Examen no disponible.');
    }
  }

  iniciarTemporizador() {
    const timer = setInterval(() => {
      if (this.tiempoRestante > 0) {
        this.tiempoRestante--;
      } else {
        clearInterval(timer);  // Detiene el timer
        this.mostrarModal = true;  // Muestra el modal cuando el tiempo se ha agotado
      }
    }, 1000);
  }
  capturarRespuesta(preguntaId: number, respuesta: string) {
    this.respuestas[preguntaId] = respuesta; // Almacenamos la respuesta seleccionada
  }

  enviarExamen() {
    const idSemana = this.examenService.getIdSemana();
  
    if (!idSemana) {
      console.error('No se pudo obtener el id de la semana');
      return;
    }
  
    const data = this.preguntas.map((pregunta: any) => {
      return {
        idpregunta: pregunta.id,
        idsemana: idSemana,
        idusuario: this.idUsuario ?? 0,
        respuesta: this.respuestas[pregunta.id] || ''
      };
    });
  
    this.backendService.guardarRespuesta(data).subscribe(
      (response) => {
        console.log('Respuestas guardadas con éxito:', response);
        
        const usuario = JSON.parse(localStorage.getItem('userData') || '[]')[0];
  
        const semanaActualizada = usuario.semanas.map((semana: any) => {
          if (semana.idsemana === idSemana) {
            semana.estado = 1;
          }
          return semana;
        });
  
        usuario.semanas = semanaActualizada;
        localStorage.setItem('userData', JSON.stringify([usuario]));
  
        const semanaPendiente = usuario.semanas.find((semana: { estado: number, nota: number }) => semana.estado === 0);
        this.estado = semanaPendiente ? 0 : 1;
  
        console.log('Estado actualizado:', this.estado);
      },
      (error) => {
        console.error('Error al guardar respuestas:', error);
      }
    );
  
    console.log('Examen enviado');
    console.log('Respuestas:', data);
  
    this.mostrarModalCompleto = true;
  }
  
  cerrarModal() {
    this.mostrarModal = false;
    this.enviarExamen();  
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    
  }
  finalizarExamen() {
    this.mostrarModalCompleto = false;

    this.router.navigate(['/examenes']); 
  }

}