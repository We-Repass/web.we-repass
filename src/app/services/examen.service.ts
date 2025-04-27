import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {
  private examen: any = null;
  private idSemana: number | null = null;

  constructor() { }

  setExamen(examenData: any, idsemana: number): void {
    this.examen = examenData;
    this.idSemana = idsemana;
  }

  getExamen(): any {
    return this.examen;
  }

  getIdSemana() {
    return this.idSemana;
  }

  hasExamen(): boolean {
    return this.examen !== null;
  }
}
