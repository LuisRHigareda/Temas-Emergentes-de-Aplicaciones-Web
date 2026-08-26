type EstadoPrestamo = "activo" | "devuelto" | "vencido";

interface Prestamo {
    folio: string;
    multa: number;
    ejemplar: number;
    estado: EstadoPrestamo;
    socio?: string;
}

function calcularMulta(prestamo: Prestamo): number {
    const cargoFijo = 50;
    return prestamo.multa + cargoFijo;
}

function reciboDe(prestamo: Prestamo): string {
    if (prestamo.socio === undefined) {
        return "Recibo de socio no registrado";
    }

    return `Recibo de ${prestamo.socio.toUpperCase()}`;
}

const prestamo: Prestamo = {
    folio: "P-101",
    multa: 350,
    ejemplar: 14,
    estado: "vencido",
    socio: "Luis Higareda"
};

console.log(reciboDe(prestamo), "->", calcularMulta(prestamo));

