import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CrearClaseDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsInt()
  duracionMin!: number;

  @IsOptional()
  @IsString()
  descripcion?: string | null;
}