import {
  IsBoolean,
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
} from 'class-validator';

export class ActualizarMiembroDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsEmail()
  correo?: string;

  @IsOptional()
  @IsIn(['basica', 'plus', 'premium'])
  membresia?: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}