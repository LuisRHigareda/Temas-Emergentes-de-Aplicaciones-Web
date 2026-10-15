import {
    pesos,
} from '../datos';

interface PiePaginaProps {
    piezas: number;
    total: number;
}

export function PiePagina({
    piezas,
    total,
}: PiePaginaProps) {

    const resumen =
        piezas === 0
            ? 'Tu carrito está vacío'
            : `${piezas} pieza(s) en el carrito`;

    return (
        <footer className="pie">

            <span className="pie__resumen">
                {resumen}
            </span>

            <span className="pie__total">
                {pesos.format(total)}
            </span>

        </footer>
    );
}