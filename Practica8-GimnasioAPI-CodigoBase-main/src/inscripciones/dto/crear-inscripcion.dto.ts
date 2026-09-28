import {
  IsInt,
  IsPositive,
} from 'class-validator';

export class CrearInscripcionDto {
  @IsInt({
    message: 'horarioId debe ser entero',
  })
  @IsPositive({
    message: 'horarioId debe ser mayor que cero',
  })
  horarioId!: number;

  @IsInt({
    message: 'miembroId debe ser entero',
  })
  @IsPositive({
    message: 'miembroId debe ser mayor que cero',
  })
  miembroId!: number;
}