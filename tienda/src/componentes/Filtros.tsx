type Categoria =
    | 'todas'
    | 'calzado'
    | 'ropa'
    | 'accesorios';

interface FiltrosProps {
    activa: Categoria;

    onCambiar:
    (categoria: Categoria) => void;
}

const categorias: Categoria[] = [
    'todas',
    'calzado',
    'ropa',
    'accesorios',
];

export function Filtros({
    activa,
    onCambiar,
}: FiltrosProps) {
    return (
        <nav className="filtros">

            {
                categorias.map(
                    (categoria) => (

                        <button
                            key={categoria}
                            className={
                                categoria === activa
                                    ? 'filtros__boton filtros__boton--activo'
                                    : 'filtros__boton'
                            }
                            onClick={
                                () =>
                                    onCambiar(
                                        categoria,
                                    )
                            }>

                            {categoria}

                        </button>

                    ),
                )
            }

        </nav>
    );
}

export type {
    Categoria,
};