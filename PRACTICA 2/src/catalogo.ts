import { readFileSync } from "node:fs";

import type { Libro } from "./dominio/tipos.js";
import { json, text } from "node:stream/consumers";

function esLibro(valor: unknown): valor is Libro {
    if (typeof valor !== 'object' || valor == null) return false;

    const o = valor as Record<string, unknown>;

    if (typeof o.id !== 'string' || typeof o.titulo !== 'string') return false;

    if (typeof o.autor !== 'string') return false;

    if (typeof o.ejemplares !== 'number') return false;

    if ('anio' in o && o.anio !== undefined && typeof o.anio !== 'number') return false;

    return true;
}

export interface CatalagoCargado {
    libros: Libro[];
    descartados: number;
}

export function cargarCatalogo(ruta: string): CatalagoCargado {
    const texto = readFileSync(ruta, 'utf8');

    const crudo: unknown = JSON.parse(texto);

    if (typeof crudo !== 'object' || crudo === null) {
        throw new Error("El catalogo de libros no es un objeto")
    }

    const posibles = (crudo as Record<string, unknown>).libros;

    if (!Array.isArray(posibles)) throw new Error("El catalogo no es una lista")

    const libros = posibles.filter(esLibro);

    return { libros, descartados: posibles.length - libros.length }
}
