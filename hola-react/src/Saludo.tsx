// Datos que necesita recibir el componente
interface SaludoProps {
    nombre: string;
}

export function Saludo({
    nombre,
}: SaludoProps) {
    return (
        <header className="saludo">

            <h1>
                Hola, {nombre}
            </h1>

            <p>
                Mi primera aplicación en React.
            </p>

        </header>
    );
}