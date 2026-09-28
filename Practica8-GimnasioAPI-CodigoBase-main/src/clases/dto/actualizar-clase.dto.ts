import {
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class ActualizarClaseDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsInt()
  duracionMin?: number;

  @IsOptional()
  @IsString()
  descripcion?: string | null;
}