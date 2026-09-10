import { Injectable } from '@nestjs/common';

export interface Clase {
  id: number;
  nombre: string;
}

@Injectable()
export class ClasesService {
  private readonly clases: Clase[] = [
    { id: 1, nombre: 'Yoga' },
    { id: 2, nombre: 'Spinning' },
  ];

  listar(): Clase[] {
    return this.clases;
  }

  crear(nuevaClase: Clase): Clase {
    this.clases.push(nuevaClase);
    return nuevaClase;
  }
}