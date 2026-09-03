import type { CrearPrestamoRequestDto } from '../contrato/prestamo-response.dto.js';
import { ValidacionError } from './errores-http.js';

export function validarCrearPrestamo(
  cuerpo: unknown
): CrearPrestamoRequestDto {
  const errores: string[] = [];

  if (typeof cuerpo !== 'object' || cuerpo === null) {
    throw new ValidacionError(['El cuerpo debe ser en formato JSON']);
  }

  const c = cuerpo as Record<string, unknown>;

  if (typeof c.libroId !== 'string' || c.libroId.trim() === '') {
    errores.push('libroId debe ser un texto y no debe ser vacio');
  }

  if (typeof c.socioId !== 'string' || c.socioId.trim() === '') {
    errores.push('socioId debe ser un texto no vacio');
  }

  if (!Array.isArray(c.ejemplares) || c.ejemplares.length === 0) {
    errores.push('ejemplares debe ser un arreglo con al menos un elemento');
  } else if (
    !c.ejemplares.every(
      (e) => Number.isInteger(e) && (e as number) > 0
    )
  ) {
    errores.push('ejemplares solo admite numeros enteros positivos');
  }

  if (errores.length > 0) {
    throw new ValidacionError(errores);
  }

  return c as unknown as CrearPrestamoRequestDto;
}