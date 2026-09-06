import express from 'express';

import { InMemoryPrestamoRepository } from '../infra/in-memory-prestamo.repository.js';

import { PrestamoService } from '../servicios/prestamo.service.js';

import {
  aResponseDto,
  type ErrorResponseDto,
} from '../contrato/prestamo-response.dto.js';

import { validarCrearPrestamo } from './validar.js';

import { manejarErrores } from './errores-http.js';

const PORT = 3000;

const repositorio = new InMemoryPrestamoRepository();

const servicio = new PrestamoService(repositorio);

const app = express();


// Middleware

app.use(express.json());

// Sirve publico/index.html
app.use(express.static('publico'));

// Sirve dist/cliente/cliente.js como /cliente.js
app.use(express.static('dist/cliente'));



// GET /api/prestamos?libroId=LIB-0417


app.get('/api/prestamos', async (req, res) => {
  const libroId = req.query.libroId;

  if (
    typeof libroId !== 'string' ||
    libroId.trim() === ''
  ) {
    const error: ErrorResponseDto = {
      error: 'PARAMETRO_FALTANTE',
      mensaje: 'Se requiere el parametro libroId',
    };

    res.status(400).json(error);
    return;
  }

  const prestamos =
    await servicio.listarPorLibro(libroId.trim());

  res
    .status(200)
    .json(prestamos.map(aResponseDto));
});


// POST /api/prestamos

app.post('/api/prestamos', async (req, res) => {
  const dto = validarCrearPrestamo(req.body);

  const prestamo = await servicio.crear(dto);

  res
    .location(`/api/prestamos/${prestamo.folio}`)
    .status(201)
    .json(aResponseDto(prestamo));
});


// Middleware de errores
// IMPORTANTE: va despues de las rutas

app.use(manejarErrores);


// Iniciar servidor

app.listen(PORT, () => {
  console.log(
    `Servidor corriendo en http://localhost:${PORT}`
  );
});